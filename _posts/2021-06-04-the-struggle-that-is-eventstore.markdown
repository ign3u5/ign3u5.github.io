---
layout: post
title:  "EventStore - Learnings of a broken man"
date:   2021-06-04 21:57:33 +0100
categories: jekyll update
---
# EventStore and .NET
If you're looking to connect to EventStore from a .NET application, you've got three choices: HTTP, TCP and gRPC. HTTP is available for all langauges that support HTTP requests (so almost all of them). The TCP client is a package only available as a .NET SDK and has now been deprecated by EventStore. Finally, gRPC is the one to choose if you're new. It is the future of EventStore clients and has good support across a range of languages include .NET, Java and Rust(!).
## The TCP Client
The gRPC client was only released by EventStore in the last few years. Before that, the best option for .NET developers was the TCP client.  
There are various modes of operation for EventStore. You have secure and insecure; single node and cluster. Setting the clients up to work with these different options is fiddly and configuration can be totally different depending on what you're aiming for. In my case, I was attempting to set up a local EventStore instance to work with the current code base without any changes to the code outside of basic socket and credential changes. This ended up requiring a secure cluster setup as no other configuration would have met my requirements (basically, I needed a copy of live), however, for local testing, the recommendation is an insecure single node as this is the least complicated and easiest to set up. 
### Insecure Single Node setup
My experience with EventStore's documentation is just plain bad... They're examples don't work, even when followed to the letter and a lot of important information is hidden deep within paragraphs instead of highlighted separately.  
There are various ways of running a local EventStore instance, the one I would recommend is spinning up a container using Docker. It's simple and you get repeatable results (unless they remove their Docker image).  

**Setup with Docker**  
For the following, you'll need to make sure you have Docker and, by extension, docker-compose installed.
1. Create a new empty folder and name it something suitable (i.e. EventStoreContainer)
2. Create a new file and name it docker-compose.yaml
3. Add the following to the file, in our case, we're going to be running a 20.10.2 instance which is the latest LTS version of EventStore. If you want to use a different version, go to their [Docker Hub](https://hub.docker.com/r/eventstore/eventstore/tags?page=1&ordering=last_updated) page and find it's tag for reference there.
```
version: '3.4'

services:
  eventstore.db:
    image: eventstore/eventstore:20.10.2-buster-slim
    environment:
      - EVENTSTORE_CLUSTER_SIZE=1
      - EVENTSTORE_RUN_PROJECTIONS=All
      - EVENTSTORE_START_STANDARD_PROJECTIONS=true
      - EVENTSTORE_EXT_TCP_PORT=1113
      - EVENTSTORE_EXT_HTTP_PORT=2113
      - EVENTSTORE_INSECURE=true
      - EVENTSTORE_ENABLE_EXTERNAL_TCP=true
      - EVENTSTORE_ENABLE_ATOM_PUB_OVER_HTTP=true
    ports:
      - "1113:1113"
      - "2113:2113"
    volumes:
      - type: volume
        source: eventstore-volume-data
        target: /var/lib/eventstore
      - type: volume
        source: eventstore-volume-logs
        target: /var/log/eventstore

volumes:
  eventstore-volume-data:
  eventstore-volume-logs:
```  
4. Open a command prompt in that directory and run  
`docker-compose up`  
This will start an instance of EventStore and you should see an output in the terminal window. If you have any issues connecting, this is the place to look.
5. Go to [localhost:2113](http://localhost:2113) and you should now have access to the EventStore dashboard.  

**TCP Client Configuration**
1. Open a new CLI project in .NET in your editor of choice.
2. Go to the package manager and include a reference to the EventStore.Client package from NuGet. There will be a few other client options but these are the gRPC clients. 
3. The following code is going to setup a connection with TLS disabled from the client end and append an event to test-stream.
```
var settings = ConnectionSettings.Create()
			.DisableTls();

var conn = EventStoreConnection.Create("ConnectTo=tcp://localhost:1113", settings);

await conn.ConnectAsync();

var data = Encoding.UTF8.GetBytes("{\"a\":\"2\"}");
var metadata = Encoding.UTF8.GetBytes("{}");
var evt = new EventData(Guid.NewGuid(), "testEvent", true, data, metadata);

await conn.AppendToStreamAsync("test-stream", ExpectedVersion.Any, evt);
```  
Before we move on, there are a few things of note here. The first is that there are multiple different ways to setup a connection to EventStore from the client that all achieve the same behaviour. This, in my opinion, is hugely confusing and unecessary. Below, I'll list some interchangable variations of line 4 that will all do the same thing.
```
var conn = EventStoreConnection.Create(settings.Build(), new Uri("tcp://localhost:1113"))
```
```
var conn = EventStoreConnection.Create("ConnectTo=tcp://localhost:1113;UseSslConnection=false");
```
Anyway, moving on  

4. When you've run the code, switch back to your [localhost:2113](http://localhost:2113) tab and go to the *Stream Browser* tab (fyi, this would not have been available if we hadn't include the `EVENTSTORE_ENABLE_ATOM_PUB_OVER_HTTP=true` config option in the yaml).  
In that tab, you should see 1 recently created Stream called *test-stream* with one event inside it. And that's it, you've connected and successfully appended an event.
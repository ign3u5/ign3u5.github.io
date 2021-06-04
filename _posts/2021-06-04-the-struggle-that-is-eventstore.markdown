---
layout: post
title:  "EventStore - Learnings of a broken man"
date:   2021-06-04 21:57:33 +0100
categories: jekyll update
---
# EventStore and .NET
If you're looking to connect to EventStore from a .NET application, you've got three choices: HTTP, TCP and gRPC. HTTP is available for all langauges that support HTTP requests (so almost all of them). The TCP client is a package only available as a .NET SDK and has now been deprecated by EventStore. Finally, gRPC is the one to choose if you're new. It is the future of EventStore clients and has good support across a range of languages include .NET, Java and Rust(!).
## The TCP Client
The TCP client is
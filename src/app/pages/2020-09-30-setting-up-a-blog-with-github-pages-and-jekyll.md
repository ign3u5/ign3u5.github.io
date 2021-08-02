---
layout: post
title:  "WIP - Setting up a blog with GitHub Pages and Jekyll - My struggle"
date:   2020-09-30 23:27:33 +0100
categories: jekyll update
---
# A Brief Introduction to my First Post
This is my first blog post so who knows how this is going to go. Hopefully this is a helpful resource to someone, potentially my future self. This particular post was instigated by the difficulties I had setting up the components to produce this site. 

Firstly, the GitHub docs page for this ommited a number of steps and troubleshooting that was necessary for me during the set up process. Personally speaking, hitting complications in what I would expect to be a simple set up process, can be the difference between me bothering to do it or not. Sadly, unless it's a requirement that someone is dependent on, I find persisting difficult (this most likely stems from other issues which I may divulge in a future post).

In this post, I will detail the exact process I had to go through in order to get this up and running. Along the way, I will include side notes that will give a further explanation of what the commands are doing that may help with regards to further individual troubleshooting requirements. I find that being able to gain a more hollistic, abstract understanding of a tool that I'm using allows me to debug a lot of issues that I'm having (or at the very least, I get an idea where to start Googling, which is half the battle).

# The Layout Explained
So, I think the best way to layout my posts (this is subject to change mind!) is to have a section that will allow those of you that are of a more TLDR mindset or just don't have the time, to follow the steps and get it done. I'll then have a section just after that will hopefully go into more of an indepth understanding of each tool or step involved. This could be used for personal development or for individual troubleshooting needs if what I've done doesn't work. 
I can't see myself going back and updating these when they get out of date unless either I re-follow them and they don't work or someone moans at me on Twitter (can't see anyone actually reading them so doubt...)

# The TLDR Steps
### Install Ruby
If you have Chocolatey installed, running the following should do the trick  
`choco install ruby` 
### Refresh your PATH variables
You have to refresh your current environment in order to use the `ruby` and `gem` commands  
`refreshenv`
### Install Bundler
This is when things start getting messy, run the following command  
`gem install bundler`
### Refresh again for Bundler
You know what to do...  
`refreshenv`
### Initialise Bundler
You have to initialise Bundler in the current directory, this is a step ommited by GitHub docs... who knows why  
`bundler init`
### Install msys2
If you already have this installed, don't bother with this next step  
`ridk install`
### Add the Jekyll gem
Not too sure whether this step works with a version number yet but I'll update if not  
`bundle add jekyll version`
### Initialise a new Jekyll site
The follow command will set up all the code necessary to run the site.  
`bundle exec jekyll new . --force`
### View it locally
Go to localhost:4000 to view the site once it's running  
`bundle exec jekyll serve`

# A Deepish Dive
### A Chocolatey Surprise
Chocolatey Software is a package management solution. That's all there is to know really. It's hugely easy to install and their docs really are full coverage. Just pop over to [this site][choco-site] to find out about installation.

[choco-site]: https://chocolatey.org/docs/installation
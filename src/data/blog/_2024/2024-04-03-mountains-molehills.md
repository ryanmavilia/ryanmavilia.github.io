---
title: Mountains to Molehills
description: Exploring the challenges of starting new projects and finding the right balance between planning and action
pubDatetime: 2024-04-03T00:00:00Z
featured: true
draft: false
tags:
  - development
  - productivity
slug: mountains-molehills
---

When starting a new project, it's important to be realistic about the challenges involved. I'm working on
an app that allows users to create collaborative SoundCloud playlists. It was awesome to get the first API
call to work to just update a playlist with whatever songs I provided. I was so ready to build more
because this feeling was awesome.But then I looked up and saw the mountain in front of me.

## The mountains

I needed to have user accounts, passwords, and a better API connection. The typical advice is to start
small which would be great but it comes with its own issues. If I don't think about users now how am I
gonna add users to existing playlists later? Do I support both? Do I even need to have users in the end?

It's like laying down a railroad track. You have to lay down your track in front of you but then you look
up and realize how far you have to go. You try to start small but if you never look up you may end up
steering your track off course. How do we build towards the destination we want without feeling like our
journey will never end?

## Working towards a solution

Things get overwhelming very quickly. You start to face a dilemma: **build everything upfront or
prioritize core functionality?** This embodies the balance between "future-proofing" and efficient
development.

Future needs are important, but building a complex system from scratch hinders progress. Prioritize your
core functionality but as you do so make sure to factor in what design decisions you're making that could
create issues in the future. When you identify those things consider compromises you can make to mitigate
them without doing all the work upfront.

### Real life example

This applies not only to software development but to your life as well. Take renovating a house for
example. Tearing down walls feels liberating, but skipping the plan for future electrical outlets,
plumbing, and desired features hidden behind them can lead to a nightmare of rerouted wires, damaged
structures, and missed opportunities for recessed lighting or hidden storage. By tackling the seemingly
small task of planning upfront, you avoid the much larger challenges and expenses of rework later – a
classic example of the "mountains to molehills" approach in action.

### Exemplifying compromise

Data modeling presents another challenge. Newer developers often struggle with building for now versus the
future. Building an MVP requires a quicker approach, but later data model changes can be disruptive.

For example, if playlists aren't currently tied to users, what happens to "public" playlists when user
accounts are added? Think through these potential changes. Do you need to backfill data, and if so, do you
have the information needed?

In this case, I wouldn't. However, I do need to tie playlists to users somehow. One option could be adding
simple "passwords" without initial users. Then, when I implement users, I could give people the ability to
transfer their playlists to accounts using those passwords.

## Staying on the right path

We must acknowledge the bigger picture while focusing on the immediate task. For my app, this means
breaking the project down into smaller milestones. Instead of getting overwhelmed by the entire
development process, I can focus on completing a functional prototype for a single user. Once complete, I
can celebrate that accomplishment and re-evaluate the path ahead. User feedback might identify new
features that require a course correction but I can't predict everything and I certainly can't build the
"perfect" app if I haven't even built the imperfect one first.

This iterative approach mirrors the railroad track analogy. We lay down manageable sections of track,
assess the landscape, and adjust our approach as needed. This continuous cycle allows us to make steady
progress without succumbing to the illusion of insurmountable mountains.

## The Agile approach

Starting simple is always great advice but for more complex things it doesn't always hold true. You have
to learn how to break down your grand vision into smaller projects which can be changed out as needed.
Once you have those you can break the projects into tasks which can also be modified to your liking. This
Agile approach is a great starting point. The important thing to remember is the long game. Cal Newport, a
productivity expert, recommends focusing on long-term goals and taking consistent action. Find the
methodologies that enable you to produce your best work in the long run.

This app I've been building could become something really amazing not just for myself but for other
SoundCloud users as well. My vision excites me but the work required is daunting. Instead of staring at
the mountain of tasks, I find it more productive to focus on the immediate path. I put in a few hours of
focused work. Then when I take a step back I'm often surprised by how much progress I've made. The journey
unfolds in unexpected ways. Sometimes you realize you're closer to the peak than you thought. You may even
stop to look up and realize there's an even faster route to take. That's the beauty of the development
process. There's always room for adaptation. You just have to keep walking and find the pace that works
best for you.

At least that's how the journey looks in my head. We'll see how far I make it by the end of this month!

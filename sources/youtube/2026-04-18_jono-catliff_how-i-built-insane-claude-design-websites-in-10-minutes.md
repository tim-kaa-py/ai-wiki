---
title: "How I Built INSANE Claude Design Websites In 10 Minutes"
source_type: "youtube"
channel: "Jono Catliff"
date: "2026-04-18"
url: "https://m.youtube.com/watch?v=xYv4_cTOSNM"
pillar: "building"
tags: [claude-design, claude-code, nextjs, gsap, vercel, tutorial, deployment]
ingested: "2026-04-21"
extraction_method: "auto-captions"
video_id: "xYv4_cTOSNM"
duration: "16:28"
---

[00:00] Claude design is literally everywhere on
[00:02] the internet right now. You almost can't
[00:04] even escape it and people are posting
[00:06] beautiful websites that they have
[00:08] created. And in today's video, we're
[00:10] going to be talking about how in a
[00:12] matter of 10 minutes, you can build a
[00:15] gorgeous, beautiful website using Claude
[00:18] code that not only contains one page,
[00:21] but also has three, four, five, six,
[00:24] however many pages you want and we're
[00:27] going to be adding gorgeous animations
[00:29] to it. So when you scroll down the page,
[00:31] it really feels like it's coming to
[00:33] life. And of course, we're going to
[00:35] deploy this live. Now, this is great
[00:37] news for anyone who wants to design
[00:38] websites very quickly with of course,
[00:41] the exception of Figma and Adobe who are
[00:43] having probably horrific days with AI
[00:46] overtaking their business. In order to
[00:48] get started, we're going to head over to
[00:49] Claude.ai
[00:51] and we're going to click design on the
[00:52] sidebar here. The first thing that we
[00:54] need to do is we need to create
[00:57] something called a design system. And
[00:59] what a design system allows us to do is
[01:01] have a coherent, unified brand across
[01:04] every single page. Now, Claude already
[01:07] does this out of the box really well,
[01:09] but I want to show you a trick that
[01:10] works for me. I found this site called
[01:13] getdesign.md
[01:15] and these guys have created a brand kit
[01:18] for 68 of the biggest brands in the
[01:20] world. So, if you've ever thought, "Hey,
[01:22] I want to clone Airbnb, Airtable, Apple,
[01:25] Binance, BMW", you can do it all for
[01:27] free very quickly. We're going to be
[01:29] using Claude example and they have given
[01:31] us the entire brand kit for Claude. All
[01:34] of the headlines, all of the colors, all
[01:38] of the font families and on top of that,
[01:40] you can actually toggle into dark mode,
[01:43] so you can rotate between the two,
[01:44] whichever you prefer. You can even tie
[01:47] your website to a user's time zone so
[01:49] that it's light during the day, dark
[01:50] during the night. And in order to get
[01:52] started with the design kit, we'll head
[01:53] over to the design.md toggle and all of
[01:56] this text, we're going to want to copy.
[01:58] And once it's copied, we'll head back
[02:00] into Claude design in the design systems
[02:02] tab and we're going to create our own
[02:05] design system by pasting in everything
[02:06] we copied into the additional notes and
[02:09] that's really it. That's going to build
[02:10] out this entire reusable design system
[02:13] that we can use across all of our
[02:14] websites, presentations, animated
[02:16] videos. You can also um add as much
[02:18] information as you want about your
[02:20] business or your project. For me, I'm
[02:22] just going to add in the name here and
[02:23] generate it and this will take
[02:25] approximately 5 minutes. We are back and
[02:27] we have the entire branding suite built
[02:29] out from top to bottom. Look at this. We
[02:32] can even go in, drill down into like
[02:35] icons here and they've picked out all of
[02:37] the favorite icons that we can use. They
[02:39] have things like buttons that are
[02:41] already built out that we're going to
[02:43] reuse across the entire website. They
[02:45] have things like type families or they
[02:48] have things like marketing UI kit. I've
[02:50] no idea what that is, but essentially
[02:52] that's kind of what it looks like. Cool.
[02:54] So, all of this stuff has been built
[02:56] out, which means that we can now use
[02:58] this design kit to build out our
[03:00] website. So, back inside of Claude
[03:02] design in the home section, we're going
[03:05] to choose prototype. We're going to name
[03:07] this whatever it is we want. I don't
[03:09] know. I'm going to call this Automatable
[03:11] and we have to choose the right design
[03:13] system that we created and also um
[03:16] between the two, wireframe and high
[03:17] fidelity, I would choose high fidelity
[03:19] because this is what's going to make us
[03:21] beautiful websites. Wireframing is like
[03:23] literally just putting the structure of
[03:24] the page together so that you can
[03:26] understand which where which elements go
[03:28] where. Like this video goes there or
[03:29] this text goes there or whatever the
[03:31] case may be. And then we can click
[03:33] create down here.
[03:34] Okay. So, now what we want to do is we
[03:37] want to make sure that the design system
[03:40] is selected, which in this case it
[03:42] actually is. We can see the output right
[03:44] down here. And we can go ahead and use
[03:48] that design system for the design
[03:50] portion of the website, but I want to
[03:51] take it a step further and I want to
[03:53] grab a page, a sample page off
[03:56] durable.com for the structure. So, we
[03:58] have one thing for the design, one thing
[04:00] for the structure, combined together to
[04:02] make the optimal page. So, I'm going to
[04:04] choose um marketing agency website here.
[04:08] Keep in mind, durable is just like a
[04:09] design library where you can find
[04:11] beautiful assets like website pages or
[04:14] whatever it is that you want to build
[04:15] out. Okay? And this will instruct Claude
[04:18] design on building something out
[04:20] properly. So, I like this one. I'm happy
[04:23] with it. I'm going to come down to this
[04:24] picture over here and I'm going to save
[04:26] this as an image. And the difference is
[04:29] is that the website that we're building,
[04:31] it's not going to look like this at the
[04:33] final
[04:34] revision or final draft. What's going to
[04:36] happen is the structure will be the
[04:37] same. So, we'll have this headline and
[04:39] some graphic in the middle here and then
[04:41] so on and so forth. But what is going to
[04:44] change is the design. It's going to look
[04:45] more like Claude's style, theme, colors,
[04:48] all that kind of stuff. Okay, cool. So,
[04:50] back inside of our project, now we can
[04:53] attach a screenshot right over here. And
[04:56] the cool thing is
[04:57] >> [clears throat and cough]
[04:57] >> is we can literally just talk to Claude
[05:00] to generate this prompt. Now, we can
[05:02] literally just talk to Claude to build
[05:05] out this prompt. Can you please build
[05:06] out a beautiful agency website for my
[05:09] company Automatable that has five pages
[05:11] on it. First of all, I want the
[05:13] homepage, services page, contact page,
[05:16] about page and use uh case studies page.
[05:20] Okay? And I want you to use the Claude
[05:23] design system to build out all the
[05:25] branding, but I also want you to use the
[05:27] screenshot attached for the structure of
[05:30] the page.
[05:32] Cool. I'll send that off. So, the
[05:34] website design has been created. We can
[05:36] see all the pages here and in order to
[05:37] view it, we can just click into the
[05:39] actual image there.
[05:41] Awesome. So, we got the contact page.
[05:43] This looks good. We got the about page.
[05:45] This also looks good and the um style
[05:47] between the two is very coherent, which
[05:49] I really like. But there is a lot of
[05:50] placeholders here that we're going to
[05:52] have to change because nothing screams
[05:54] stock footage or stock websites more
[05:56] than having a blank placeholder for
[05:58] Jonas Mercer. Uh so, that's something
[06:00] we'll definitely have to change. But in
[06:02] order to do that, I'll just walk through
[06:03] really quickly how you how you'd go
[06:05] about changing it very fit quickly. You
[06:07] can hit comment here and the beautiful
[06:09] thing is is when you hit any of these
[06:10] buttons, it's going to allow you to
[06:11] select an element on the page. And
[06:13] whatever element on the page that you
[06:14] select, now Claude code knows exactly
[06:16] what it is you're looking to change. So,
[06:18] I can just type in here, "Please upload
[06:21] this photo for this uh placeholder" or
[06:25] whatever. And we can see that it has the
[06:28] selected area down here knowing that
[06:29] we're select we're choosing this
[06:31] particular image. We could add in, I
[06:33] don't know, just like a standard photo
[06:36] and then it would just swap it out in a
[06:37] matter of a couple seconds for us. And
[06:39] so, that's how you can really easily
[06:40] edit anything inside of Claude design.
[06:44] You can also click edit here if you want
[06:46] to change exact things like for example,
[06:49] the color, the font size, the font
[06:51] family, all that kind of stuff. And if
[06:52] you want to get super granular with it,
[06:54] you can hit this draw button over here,
[06:56] circle something on the page and now you
[06:59] can um just say what it is you want
[07:02] changed. Can you please update the um
[07:06] stopped text to red.
[07:09] Cool. So, I'm not going to change
[07:10] anything there, but I think you get the
[07:12] point. You can easily circle very
[07:14] specific things and change it there as
[07:16] well. Let's head over to the case
[07:17] studies page. Looks good. Okay. Um
[07:21] you'll notice that it's very static.
[07:22] There's no real animations. We're going
[07:24] to be adding that in later on. This
[07:27] services page also looks great and the
[07:30] um homepage also looks great as well.
[07:33] So, I'm happy with that. Now, what we
[07:35] need to do is export this so that we can
[07:37] actually turn this into a real website
[07:39] and deploy it so that anyone in the
[07:40] world can access it. Just one more thing
[07:42] before we go ahead and do that. At the
[07:44] beginning of the video, I was talking
[07:45] about a lot of these we're we're seeing
[07:47] a lot of these like motion graphics and
[07:49] animated videos and we can easily do
[07:51] that inside of Claude design as well.
[07:54] So, I'm not going to walk through the
[07:54] whole thing here, but I just typed in a
[07:56] prompt like, "Can you make me an
[07:58] animated motion graphic?" Okay? And it
[08:00] will literally go to work for you and
[08:02] build out whatever it is you want. And
[08:04] the more descriptive you are for this
[08:06] motion graphic, the better it's going to
[08:08] be. Usually for these kind of things, I
[08:10] like to go to Claude first, tell it what
[08:13] I want, have it turn it into a mega
[08:15] prompt. So, you might give a sentence,
[08:17] you might get 10 sentences back and then
[08:19] you can dump that into uh this this
[08:22] chatbot right down here or this chat and
[08:24] it will build something absolutely
[08:26] beautiful for you. You can go back and
[08:27] forth until it's perfect. Okay. Next
[08:30] thing is is we have to export this and
[08:32] build the website. So, we're going to
[08:34] choose export here, okay? And we want to
[08:37] select handoff to Claude code. Now, we
[08:40] can just copy the code here and for the
[08:42] rest of this video, we're going to be
[08:44] building out this website using Claude
[08:46] code instead of Claude design. Now, if
[08:48] this is your first time using Claude
[08:50] code, no problem. Let me give you a
[08:51] really quick uh crash course on how this
[08:54] works. Essentially, you want to download
[08:56] one of two pieces of software. Both are
[08:58] going to be free. One is either Google's
[09:01] anti-gravity. The other is VS code.
[09:03] These are both code workspaces. This is
[09:05] essentially what it looks like when you
[09:06] open it up. It's kind of a misnomer cuz
[09:08] you hear code in the word and you're
[09:09] like, "Oh my gosh, this has to be super
[09:11] technical." But it doesn't have to be
[09:13] technical at all. You don't need to have
[09:15] any technical experience. All you have
[09:17] to do is be able to download the
[09:19] application, head over to the uh section
[09:22] right over here called extensions and
[09:24] then search for Claude code for VS code.
[09:27] It's the same name in both apps.
[09:29] Download it or install it and you're
[09:31] good to go. You now have access to
[09:33] Claude code in the sidebar. You can
[09:34] create a new session. You will have to
[09:35] log in to an account here in order to
[09:39] actually start using it. Okay, cool. So,
[09:41] that's the
[09:43] very quick crash course. Now, what we
[09:45] need to do is actually build the site.
[09:47] In order to build out a site, we always
[09:49] need to start with a folder. So, anytime
[09:52] you're creating a website or a project
[09:54] or anything inside Claude code, we need
[09:55] to choose open a folder, okay, and I am
[09:59] going to create a brand new folder. This
[10:02] is going to be called design,
[10:04] and it will be empty.
[10:06] That is it. Now, circling back to
[10:10] Claude design, we can copy this command,
[10:13] and we can literally just paste it into
[10:16] Claude code right over here. Okay,
[10:18] sweet. So, we're going to paste this in,
[10:20] but there's one additional prompt this
[10:22] we're going to have to add to this in
[10:24] order for us to literally one shot this
[10:26] into a beautiful website. Can you please
[10:29] build this Claude design website using
[10:33] Next.js, and
[10:36] can you use the library GSAP to be able
[10:40] to add animations to the page wherever
[10:43] appropriate? I want to add as many
[10:45] beautiful stunning animations as
[10:48] possible without it looking cheesy.
[10:51] And I want you to read the claude.md
[10:54] file and build this out in one go.
[10:58] Cool. And so, this is our prompt right
[10:59] over here. It's going to literally one
[11:02] shot this entire website. There's just
[11:04] one additional step that we need to do
[11:06] in advance, and that is adding one file
[11:08] here. It's called the claude.md file.
[11:10] This is actually what I referenced in
[11:12] this particular prompt, okay? And what
[11:16] this is is you can kind of think about
[11:18] it like an instruction manual. When you
[11:19] hire an employee to work at a job, you
[11:22] need to tell them what it is they're
[11:23] doing and how they need to behave. And
[11:25] this is the exact same thing for Claude
[11:27] code. And in order to get this file,
[11:29] it's going to be down below in the
[11:30] description for free. There will be a
[11:32] free link to my school community, okay?
[11:34] And in there, there's going to be a file
[11:36] like claude.md web app. All you have to
[11:38] do is open that up, copy the code, and
[11:41] then paste it in here. This is the
[11:43] blueprint or the the system instructions
[11:45] to actually build this out properly.
[11:47] Once that's good to go, we can fire off
[11:49] this, and it should be able to clone
[11:52] this entire design in one shot and add
[11:55] animations to it so that we have a fully
[11:57] functioning website. All right. So, the
[11:59] website is up, and in order to view it,
[12:01] we can click this localhost link right
[12:03] over here. Sweet. So, right away, looks
[12:06] pixel-for-pixel
[12:08] perfect. If we were just to compare it
[12:10] over here to what we've already
[12:11] designed, looks pretty much identical.
[12:13] But, the difference here is we've also
[12:15] added a ton of animation. So, if I
[12:18] refresh the page, you can see the text
[12:20] flying in here, all the buttons floating
[12:22] up. One of my favorite things is
[12:23] actually this right over here, this
[12:25] slider and all all this kind of stuff
[12:27] happening. Even when we like scroll up
[12:28] and down the page, you'll see that the
[12:30] brand partners are also moving as well,
[12:33] and it continues all the way down the
[12:34] page, like these numbers scrolling up as
[12:36] well. So, there's a lot of cool stuff
[12:38] you can do. And the best part about this
[12:40] is that we didn't have to do anything
[12:42] ourselves. We got an external library to
[12:45] to do this, and Claude code literally
[12:46] built the whole thing. What that is is
[12:48] GSAP, and we included it in that prompt,
[12:51] and it just layered it into the website.
[12:53] But, there's a lot of cool stuff that
[12:54] you can do here. So, I just went to
[12:56] demos.greensock.com. You can go to their
[12:58] website and find this pretty fast. But,
[13:00] essentially, like all of this kind of
[13:02] stuff you could really easily add to
[13:04] your website, and this is all using the
[13:07] same library that we already were using.
[13:09] And you just ask Claude what you want it
[13:11] to build, and it will go ahead and do it
[13:13] for you. Cool. So, that's just a couple
[13:15] demos of the things that you can do with
[13:17] a library like this automatically using
[13:20] GSAP [clears throat] and Claude code.
[13:21] So, now that the website's been done,
[13:23] everything looks great, we need to
[13:25] actually get this online so that other
[13:26] people can view it, cuz right now, it's
[13:28] a localhost environment. And what that
[13:30] means is that all we're doing is we're
[13:32] rendering static files. So, all these
[13:34] files here we're rendering in the in the
[13:37] browser, but nobody else can actually
[13:38] view the site. It's just us that have
[13:40] access to it. So, how we do this is a
[13:42] two-step process, and both pieces of
[13:44] tech are free. First, we're using
[13:45] GitHub. This is like Google Drive, but
[13:49] for code. You just upload code online,
[13:51] and then it sits in the cloud, and then
[13:52] we can access that code in GitHub in
[13:55] Vercel, and Vercel just pushes it alive
[13:57] so that we actually have a website where
[13:59] anyone can view it anytime, anywhere.
[14:01] Okay, so that's essentially it. In order
[14:03] to do this, what we're going to do is we
[14:05] are going to head over to GitHub. So,
[14:08] I'm going to type into the browser
[14:10] GitHub,
[14:11] create a new account if you haven't done
[14:12] so already. That is free, and we'll
[14:14] create a new repository. So, this is
[14:17] going to be called design,
[14:19] and you'll probably want this to be
[14:21] private so nobody else has access to
[14:23] your code. And then we'll create that
[14:25] repository. And literally, all we have
[14:26] to do in order to get this live and up
[14:29] is just copy this code here. So, we're
[14:31] going to hit that copy button, okay? And
[14:34] then back inside Claude code, I'm just
[14:36] going to send a message. Can you please
[14:38] upload all the code in this project to
[14:39] GitHub? Make sure to deploy it all in
[14:41] one go. Cool. So, it's been completed.
[14:44] If we refresh the page, now we can see
[14:46] all of the code from our project here
[14:49] inside of GitHub. So, this step is done.
[14:52] The next step is to head over to Vercel.
[14:54] And by the way, the way this is also for
[14:56] free. You just need to create a free
[14:57] account. You can add a new project up at
[14:59] the top right, and we need to connect in
[15:04] we need to connect in Vercel and GitHub
[15:06] so that we can grab that code from
[15:08] GitHub and then deploy it live. So, I've
[15:09] already done that. All I'm going to do
[15:11] here is click import, okay, from that
[15:13] project. And the only thing that we have
[15:15] to do here, the only thing is just
[15:16] change this application preset to
[15:18] Next.js. This is very important. And
[15:21] then once that is done, we can hit
[15:22] deploy, and our site's going to be live
[15:24] in a matter of couple seconds. Cool. So,
[15:26] the website's live, and to view it, you
[15:28] just got to click this link over here,
[15:29] which is called
[15:30] claude-designs-g.vercel.app.
[15:34] That is one of the least flattering
[15:36] names you can have, and immediately,
[15:37] that's going to make it like five times
[15:39] harder to sell any service to a client
[15:40] if you refer them over here. So, what
[15:42] you can do instead of using this awful,
[15:45] horrific, horrible name is you can add
[15:48] your own domain. How you do that is on
[15:50] the left-hand side, head over to
[15:51] domains. You can import it from GoDaddy,
[15:53] or you can import it from Namecheap, or
[15:55] wherever your domain is, or you can buy
[15:57] one straight through Vercel as well. So,
[15:59] that's it for this video, guys. Thank
[16:00] you so much for watching. If you found
[16:02] value in this video, make sure to hit
[16:03] that like button and subscribe button.
[16:05] All the blueprints are going to be for
[16:06] free in my free school community. I also
[16:09] have a paid school community where
[16:10] there's two transformations. If you're
[16:12] looking to build your own AI automation
[16:14] agency, I'll help you find, close, and
[16:15] fulfill your first deal in 30 days or
[16:17] less. And if you have a business, I'll
[16:19] show you how you can automate up to 80%
[16:20] of it in 2 months or less. And if you
[16:22] don't want to have to deal with
[16:23] anything, and you have a business, you
[16:25] can reach out to my agency, and we'll
[16:26] help you there. Thanks, guys."

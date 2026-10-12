---
title: "Anthropic Just Revealed 10 NEW Rules for Claude Skills"
type: "youtube"
channel: "Jay E | RoboNuggets"
date: "2026-10-05"
resource: "https://www.youtube.com/watch?v=VQyYzLJ6xos"
pillar: "building"
tags: [skills, agent-skills, claude-code, best-practices, progressive-disclosure, hooks]
timestamp: "2026-10-12"
extraction_method: "user-pasted"
video_id: "VQyYzLJ6xos"
duration: "12:15"
---

# Anthropic Just Revealed 10 NEW Rules for Claude Skills

## Extraction note

YouTube rate-limited caption download (HTTP 429) and refused audio download (HTTP 403) on 2026-10-12, so the transcript was copied from YouTube's "Show transcript" panel by the user. The pasted transcript **ends at 10:38, mid-sentence in Rule 10**; the remaining ~1:37 of the video (end of Rule 10 and outro) is not captured. Chapter markers from the YouTube panel are kept as headings. YouTube's auto-captions render "Anthropic" as "Entropic" and "Claude" occasionally as "Cloud"; these are left as-is.

## Transcript

### Intro

[00:00] Claude's 5.5 models are here and the way we build and use skills apparently need to change with them because Entropic just updated their official comprehensive guide for skills and it seems like a lot of what worked before is now either slowing you down or costing you more.
[00:15] For example, did you know that if you have a long skill file, Claude may only read the first 100 lines of that file depending on how you structure it. So if your most important guidelines are sitting further down in that skill, as far as Claude's concerned, they may as well not exist.
[00:28] So, I read through Entropic's new skills guide fully, and today we'll go through every new rule along with several examples. And I'll also share with you a prompt that audits all of your skills against these rules and improves them in one go.
[00:40] And if you're new, my name is Jay. I spent over a decade working with brands you probably know, have been in AI since my masters in data science, and now I'm leading our AI business and one of the largest AI communities globally.

### Rule 1

[00:49] The first one is around new rules for progressive disclosure. As per entropic's guide, it is best practice to keep your main skill.md file under 500 lines and everything else gets split into its own files which are linked straight from your skill.md.
[01:05] Entropic calls this progressive disclosure which basically means that claude only loads what it needs when it needs it. So the main skill.md works like a contents page and claude only opens the other files at the step that actually needs them.
[01:18] So take a skill for invoices for example. The main file has the steps and next to it we've got a pricing file, a client's file, and a scripts folder. When Claude is raising an invoice, it opens only the pricing file and the scripts file would never get loaded, saving you some tokens.
[01:35] Now, here's the catch. If the main file points to a second file, and that second file points to a third, so multiple nested references, basically, Cloud might actually only preview the third one, specifically just the first 100 lines. Entropic themselves mentioned this as a behavior that the new cloud models have.
[01:50] So what you should do as best practice is to just have your skills only be one level deep if you can. And if you do need to have multiple nested references, then that's something we'll go through in rule number two.
[02:02] But if you do want to do a simple audit of your mostus skills as per this rule, here's a prompt that can get you

### Free guide: audit every skill

[02:08] started. And by the way, I put every one of these resources and prompts into a free PDF guide, which you can just send straight to your AI agent, and it will audit all of your skills against every rule and tell you what it would change before it does it. You can just grab that in the description below if you need it.
[02:21] And by the way, if you want to learn how to build and sell AI systems that businesses actually pay for, then that's pretty much all we do over at the Robbernuggets community, where not only do you get access to the Claude Living Master Class, which we update every week and takes you from zero to mastery with the latest on AI, but you also get access to our agents as a service course, which walks you through how to actually get paid for all these AI skills that you are learning.
[02:44] You also get to be part of a genuinely great community of AI builders. In fact, you can see just some of the recent wins our members are getting from the program right here. So if you want to start earning from AI then check that just in the pin comment below. Now back to the

### Rule 2

[02:55] video. Rule number two are content lists. So any file over 100 lines would need a short content list at the very top of it which is sort of like a table of contents that tells the agent what's inside before it spends your tokens reading the whole thing.
[03:10] And this is related to the previous point where for some files only the first 100 lines get read. And so for these instances even when it's only previewing it, it can actually jump to the section it needs. if you have table of contents up at the top.
[03:22] So, for example, here's that pricing file that we were viewing once again. And at the very top, it lists the contents of what's within. Once Claude sees that, it now knows that the information for discounts, for example, is down at the bottom, even if it only previewed the first 100 lines. Rule

### Rule 3

[03:38] three is around degrees of freedom. The principle for this rule is basically where a step or a task is risky, you will need to give more detail in guardrails. But if it's not as consequential, you can be less rigid and let the model be creative in solving the problem.
[03:52] Entropic calls this setting the degrees of freedom and there are actually three levels that they are mentioning. High freedom is basically plain instructions. So you just tell it what you need. Like if you just starting to brainstorm on ways to automate your business processes because there are a lot of good ways to do that.
[04:07] Medium freedom is a template with a few settings. Like for example, in a weekly report where you want a certain shape, but a bit of variation is fine. So, you do still want the model to adhere to the template that you've set, but you don't want it to be so rigid that you miss critical new information that would have been included if you gave the model more freedom.
[04:26] And low freedom is basically an exact script like raising an invoice or maybe you're creating tax documents where being rigid and strict and detailed to a tea is required.
[04:37] And having the right degree of freedom is important because Claude's 5.5 models are now so intelligent and often quite creative now compared to their older counterparts. So if your skills are too rigid, you may be hamstringing their outputs.
[04:49] But the thing is, one skill can mix all three of these degrees of freedom. So in an invoicing skill, writing the email can be wide open while the step that creates the invoice can be the one that has a lower degree of freedom and is locked down to a script.

### Rule 4

[05:02] Rule number four is testing skills on the models you use. A skill is usually only as good as the model that's running it. As per entropic, you should test your skills on every model that you actually plan to use them with.
[05:14] And they also give you one question to check on each for Haiku, which is cheaper but less intelligent, does the skill give enough guidance for the model? For Sonnet, which is a good middle tier, is the skill clear with some guidelines and is efficient? And for Opus and Fable, which are their smartest models, does the skill avoid overexplaining so that the model has more creative freedom?
[05:34] And this matters more now because Entropic says skills written for older models are often too prescriptive for the newest models and can actually make the output worse. So if you got skills you built a while back, it's worth testing them with less guidelines.
[05:50] This also works on the flip side. You may have skills that you keep running on the smartest models, but if they're already prescriptive enough, maybe a haiku model is actually enough.
[05:58] Just note that testing every skill on every model can get expensive. Obviously, Entropic would recommend this and would love for you to do that because that would burn through your tokens, but just a caveat that for this rule, you should probably just do it for the skills you rely on the most and the ones where a mistake is consequential.

### Rule 5

[06:14] Rule five is optimizing your skill writing. So, this is a quick one, but if your skill opens with a paragraph explaining to a model what an invoice is, that's basically space and tokens you're wasting because Claude already knows what an invoice is.
[06:27] Entropic actually calls the context window a public good. So a better way is to keep only what Claude can't work out on its own like specific company stuff like your prices, your terms or your internal rules.
[06:40] I also found they had a good tip around the description of the skill and that's to write it in the third person. So, for example, the description should say that this skill creates client invoices and sends payment reminders and not I can help you with invoices and payment reminders because this is the description the claude reads when it decides which skill to use and writing it in first person can just confuse it, especially for the lower models. Rule

### Rule 6

[07:01] number six are workflows and checklists. So for jobs with a lot of steps, Entropic recommends laying the steps out clearly and giving Claude an actual checklist that it copies into his reply and takes off as it goes.
[07:14] According to Entropic, clear steps are stopping Claude from skipping something critical, which is sometimes observed, especially with the 5.5 models.
[07:23] So here's what that could look like for the invoicing skill that we are setting as an example. And the part here that I wanted to highlight is what we call the go back line. So under that check step, you can add something like if any total doesn't match the job list, then go back to step two.
[07:39] That's a pretty simple example, but Entropic uses that same idea in their own instances as well. And in this instance, it can actually stop a wrong invoice from going out just because a box got ticked. Rule seven is a related

### Rule 7

[07:49] one, which are feedback loops. So what's a feedback loop? Well, it's basically your skill checking its own work. As per entropic, the pattern is to run a skill, fix whatever fails, and then repeat until it passes. And they say this greatly improves the quality of the output.
[08:03] And these days, the verification and feedback loop doesn't have to be related to code. Entropic's first example here is actually a style guide. So they had Claude draft the content following the guide.
[08:14] Then if it's important to follow the style guide, they have it review it against a short checklist like is the terminology consistent? Do the examples follow the standard format that we've set? and are all the required sections there.
[08:25] If anything fails, Claude then notes each issue with a part of the guide it breaks, revises it, and checks again and only finishes the task when everything

### Rule 8

[08:34] has passed. Rule number eight are common patterns. There's actually three common patterns that Entropic recommends when it comes to skills where you need a more defined output.
[08:42] The first is a template format where you can also choose how strict the model needs to be. either always using the exact structure of the template or giving a sensible default and just having the model use their best judgment.
[08:54] The second are examples which are basically pairs of an input and the output that you want. So this way you give the model an idea of the prompts that you would send which are the inputs and the examples that you would expect as the output. In this case, examples show the style and the level of detail more clearly than a description does.
[09:13] And the third one is a conditional workflow which is basically a fork in the road. So Claude knows which set of steps to follow depending on the conditions of the task.
[09:20] So if you're finding that the output that your skills are giving you should be more defined, then have a think around these three common patterns and see which would apply to the task at hand. Rule number

### Rule 9

[09:32] nine is to build for sharability. Now you likely start creating your skills customized for your workspace. But at some point, especially as agentic AI becomes more prominent, you will probably need to share a skill to a co-orker or to your team.
[09:46] So this rule is about building with sharability in mind and its principle is about not assuming that the tools and plugins that your skill needs are already installed on that other person's device.
[09:56] As per entropic, you should just not write to use the PDF library, but instead you can actually include some installation instructions in the skill itself and also list the exact packages you usually use in the skill. And then you can just add a note to install this if in case it is not yet set up in the person's computer.
[10:13] Otherwise, our invoicing skill, for example, might work on your machine, but the first time that a teammate runs it, it won't be able to use it effectively. Number 10 is pretty

### Rule 10

[10:22] underutilized, but is probably one of the most important ones here, and it is about hooks. Now, let's say there's one rule in our invoicing skill that can never be broken. Like, for example, never send an invoice above $10,000 without a person sign off.
[10:36] Now, you can write that in the skill in capital letters, and most of the time Claude

[Transcript ends here — 10:38 to 12:15 not captured.]

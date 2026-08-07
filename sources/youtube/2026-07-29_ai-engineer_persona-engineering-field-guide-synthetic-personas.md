---
title: "Persona Engineering: A Field Guide to AI Synthetic Personas"
type: "youtube"
channel: "AI Engineer"
date: "2026-07-29"
resource: "https://www.youtube.com/watch?v=YnNF55QV0zs"
pillar: "understanding"
tags: [synthetic-personas, evaluation, agents, research, prompt-engineering]
timestamp: "2026-08-07"
extraction_method: "auto-captions"
video_id: "YnNF55QV0zs"
duration: "21:09"
---

# Persona Engineering: A Field Guide to AI Synthetic Personas

**Speaker:** Ishan Anand, InsightSciences.ai | **Event:** AI Engineer

[00:01] [music]
[00:13] >> Hello, I'm Ishan and welcome to can AI
[00:16] predict people like we predict the
[00:19] weather. A field guide to the nascent
[00:21] field of synthetic personas.
[00:24] Now, I'm sure most of you in this room
[00:27] at some point or another have prompted a
[00:30] large language model with a role prompt.
[00:32] You are a fill in the blank and then the
[00:35] task.
[00:37] Believe it or not, that core principle
[00:39] of steering a model's outputs as if it
[00:41] were a particular person or persona
[00:44] has turned into an entire category that
[00:47] companies are using to test product
[00:49] concepts and messaging against synthetic
[00:52] respondents. And it has moved from a
[00:54] novelty to market momentum, as you can
[00:57] see from both these headlines as well as
[00:59] the increase in funding for the last few
[01:01] years.
[01:03] And the running analogy I want to leave
[01:05] you with is that synthetic personas are
[01:08] like weather forecasting.
[01:10] Like weather forecasting, they were
[01:12] unlocked thanks to an increase in
[01:14] compute and data.
[01:16] And like weather forecasting, they
[01:18] operate within a particular regime and
[01:21] going past that sometimes can go outside
[01:24] of where they're accurate. So, for
[01:25] example, you can only predict the
[01:28] weather a certain number of days in
[01:30] advance. Similarly with synthetic
[01:32] personas, there's only so far you can go
[01:34] before you'll run into issues. And
[01:36] understanding those issues are as
[01:38] important as understanding their promise
[01:40] and their potential.
[01:43] So, I'm Ishan Nand. I'm the chief AI
[01:46] officer at Insight Sciences. We
[01:49] construct LLM synthetic personas for
[01:52] market research and market insights
[01:53] teams.
[01:55] And the reason for this talk is that
[01:57] most of the coverage in the space is
[01:59] very shallow, doesn't go into the
[02:00] technical details. It's either outright
[02:03] hype or outright dismissal. And
[02:07] it's really hard to separate the noise
[02:10] from what's real. So what I want to
[02:12] cover is that messy middle of the
[02:13] technical details. And you don't have to
[02:15] take my word for it, even though I'm a
[02:18] vendor in the space, because everything
[02:20] I'm going to talk about today is going
[02:22] to be based on published research. So
[02:24] we're going to cover why now for
[02:26] synthetic personas, how they fail, some
[02:29] techniques to inspire you, and then some
[02:31] metrics to judge whether your synthetic
[02:33] persona is accurate or not.
[02:35] Speaking of weather forecasting, another
[02:37] parallel is just like in the 1950s and
[02:40] '60s, we got computers that promised us,
[02:43] correctly, a future of accurate weather
[02:46] forecasts.
[02:48] We were also promised, believe it or
[02:50] not, people forecasts. This company,
[02:52] Simulmatics, were extensively covered by
[02:55] Jill Lepore,
[02:57] promised that they could simulate and
[02:59] predict the electorate using raw
[03:01] statistics and the computational power
[03:03] at the time. Fortunately, that turned
[03:05] out not to be the case. So you should
[03:07] approach claims like this with some
[03:09] humility. But we have something they did
[03:11] not have then. And that unlock is,
[03:14] again, more computational power, but
[03:16] also better modeling thanks to LLMs. And
[03:20] LLMs unlock a new kind of simulation.
[03:23] For the longest time, to simulate
[03:25] something meant to mathematize it in
[03:28] formulas or equations. But certain
[03:30] things, how we feel, how we act, what
[03:33] choices we make, aren't always
[03:36] succumbing to the equations. What LLMs
[03:39] offer us is a new medium, a new atomic
[03:42] unit of language itself that we can
[03:43] model against. Now granted, they are
[03:45] based on math under the hood, but it
[03:47] gives us this intermediary layer that we
[03:49] can construct and simulate against that
[03:51] we couldn't before.
[03:54] And the process can work.
[03:57] I want to share with you one of the most
[03:59] well-known demonstrations of this in the
[04:01] field.
[04:03] What they did is they took about a
[04:04] thousand humans.
[04:06] They put them through about two and a
[04:08] half hours of extensive interviews about
[04:11] their background and their views and
[04:13] their attitudes. And they put those
[04:15] people through a battery of personality
[04:17] tests and surveys.
[04:19] Then they took those transcripts and
[04:21] they passed it to an AI agent and they
[04:23] had the AI agent take the same set of
[04:26] surveys and personality tests.
[04:30] What they found was as the agents were
[04:32] basically about 83% aligned and
[04:35] predictive to the corresponding humans
[04:37] they were modeled against.
[04:39] Now one caveat is that number is
[04:41] normalized against the uncertainty and
[04:43] noise of the humans themselves. It's a
[04:46] theme we're going to come back to at the
[04:47] end of this talk.
[04:49] But don't get too excited because
[04:51] synthetic personas are different from
[04:53] regular experiments and they're liable
[04:55] to confuse and fool you if you don't
[04:57] know how they fail. So I'm going to
[04:59] cover three important failure modes that
[05:01] you need to know about when dealing with
[05:03] synthetic personas.
[05:05] To understand the first one,
[05:07] I want to consider this prompt these
[05:09] researchers gave. It's a very un It's a
[05:11] very ambiguous and very unsophisticated
[05:14] prompt. It basically says you're a
[05:16] customer, I'm going to show you a
[05:18] product, I'm going to tell you the
[05:19] category, I'm going to give you its
[05:21] price. Those are going to be the
[05:22] variables in the template and then I'm
[05:24] going to ask you to say whether you're
[05:25] going to purchase or not purchase.
[05:27] Willingness to pay, willingness to
[05:28] purchase is basically the test.
[05:32] What the researchers did is they
[05:33] recruited a panel of humans and put them
[05:35] through the same test and then they put
[05:36] the synthetic personas through the same
[05:38] test.
[05:39] What they found is very interesting.
[05:41] So the humans are here in red.
[05:43] They do exactly what you would expect
[05:44] from basic economic theory. As the
[05:46] purchase price increases, we see that
[05:50] the purchase probability goes down,
[05:52] slopes downward.
[05:53] But the LLMs did something different.
[05:56] They had this inverted U-shaped curve.
[05:58] And particularly problematic is this
[06:00] area right here, where as the price is
[06:03] increasing, the purchase probability is
[06:05] going up. That seems really bizarre.
[06:09] Through a series of additional
[06:10] experiments, what they discovered was
[06:12] that the LLM was using the price as a
[06:15] proxy for other properties about the
[06:17] product that the humans were considering
[06:19] were fixed.
[06:20] Things like the expiration date based on
[06:23] the price, what the price of competing
[06:25] products were also as the price changed.
[06:28] And those correlations, those latent
[06:30] confounders that weren't clear and
[06:32] immediate, were actually confusing the
[06:34] result.
[06:36] And the way to think about this is when
[06:37] an LLM is missing context, it has to
[06:40] potentially infer or invent confounders.
[06:44] Right? When we do a human experiment, if
[06:47] I put it like a gold watch on a table, I
[06:49] ask a human to walk in and estimate the
[06:50] price of it, everything about the
[06:52] environment is fairly fixed. The human
[06:54] and their decisions are the random
[06:56] variable. In a synthetic experiment, if
[06:58] you don't set it up properly, other
[07:01] parts of it actually become part of the
[07:03] random variable itself. I like to say if
[07:05] it's a poorly grounded persona, it's a
[07:07] little like the LLM is playing improv
[07:09] with you.
[07:10] It's like gold watch on a table? Oh,
[07:12] well, we must be in a jewelry store,
[07:14] right? It has to infer what's likely.
[07:16] And maybe this is a rich person, so
[07:17] they're more likely to purchase. And so
[07:20] the lesson is, we need to richly ground
[07:22] our personas in the personality, the
[07:25] context, and bizarrely, even the study's
[07:28] own construction. In a human subject
[07:30] experiment, you want to hide the study
[07:32] construction from the participant. But
[07:34] in the case of an LLM, they have no
[07:36] universe other than what's in the
[07:37] prompt, and you have to use the prompt
[07:39] to paint the world to prevent any type
[07:41] of confounders.
[07:43] Another failure mode is prompt
[07:45] sensitivity. So, here's a researcher
[07:47] that took a question, they give the same
[07:49] question, same choices, they just
[07:51] swapped the order of the choices. Yes
[07:54] was the first one in the first question,
[07:55] yes was the second option in the the
[07:57] second question. What they found was
[07:59] that the model had an extremely strong
[08:01] order bias.
[08:03] Basically, when they took the two
[08:04] results and they averaged them together,
[08:07] it washed out into noise, into 50/50.
[08:09] Now, humans do have a first order bias,
[08:11] but not to this extent. And so, the
[08:13] lesson here is that we need to
[08:16] durability test our personas to
[08:18] understand how they will change under
[08:20] reorderings, under rewordings, and even
[08:23] adversarial challenges to their
[08:25] opinions.
[08:27] The third and final area that I want to
[08:29] highlight is that LLMs are trained on
[08:31] what people say,
[08:33] and they're not trained on what people
[08:34] do.
[08:35] So, as a consequence, predicting stated
[08:38] attitudes tend to be easier than
[08:40] predicting actions or behaviors. Both
[08:42] because they're clear and likely to be
[08:45] in the text, but also because they are
[08:47] natively text themselves. So, this chart
[08:50] is from a bunch of researchers that used
[08:52] an LLM to try and predict known social
[08:54] science experiments.
[08:56] The original point of this chart is to
[08:57] show that the LLMs are about as good as
[08:59] the experts. LLM is in black in a
[09:02] circle, the experts are in blue, and you
[09:04] can see they're both doing about equally
[09:06] well in making the prediction. But, the
[09:07] point I want to draw you to is that
[09:09] there are two categories of experiments
[09:11] here. The top are surveys, those are
[09:13] natively language and text-based, and
[09:16] those reflect attitudes. And on the
[09:18] whole, the models tend to do better
[09:20] there.
[09:21] The bottom half is field experiments.
[09:23] Those are behaviors, and those are
[09:24] things that need to be transcribed into
[09:25] actions. They're less likely to be in
[09:27] the training data, and correspondingly,
[09:29] the LLM doesn't do as well.
[09:31] So,
[09:32] the lesson we often tell our clients is
[09:34] consider questions that triangulate to
[09:36] behavior from attitudes. As a
[09:38] hypothetical example, if you want to
[09:40] know about gym attendance, you might be
[09:41] better off, well, you can ask about
[09:43] both, but asking about attitudes towards
[09:46] working out rather than asking about
[09:48] attendance and see if that's a suitable
[09:50] proxy.
[09:51] Okay.
[09:52] Now, let's talk about three example
[09:54] techniques to kind of inspire your own
[09:57] synthetic personas.
[09:59] So, the first one is just prompting the
[10:02] model. Uh this right here is from the
[10:05] Argyle paper, which is really one of the
[10:07] seminal papers in this field. In fact,
[10:09] it's so early that the model they used
[10:12] was a text completion model. That's why
[10:14] this prompt isn't in the form of a chat.
[10:16] It's a statement of I am. So, they gave
[10:19] it a prompt that said, and for example,
[10:21] the middle column is basically where the
[10:23] context is. I am a strong liberal. I
[10:25] support progressive values, etc., etc.
[10:27] And at the end it says, "In 2016, I
[10:29] voted for." And they basically
[10:31] let the model sample its completions and
[10:34] it says, uh
[10:35] Hillary Clinton, Bernie Sanders, Hillary
[10:37] Clinton, and so forth. And you can see
[10:38] what happens with the conservative case
[10:40] on the top.
[10:41] Since this time, obviously, there've
[10:44] been a lot more prompting techniques.
[10:47] And a lot more models. And I can't tell
[10:50] you which prompting technique and which
[10:52] model is going to work best for your use
[10:54] case. What you are going to have to do
[10:56] is figure it out empirically by
[10:58] validating against some known human
[11:00] ground truth data. You'll have to do
[11:02] what these guys did. So, for example,
[11:04] here in this research, they're trying to
[11:06] figure out how well they can construct
[11:07] personas to represent voting patterns.
[11:10] What they found was they compared here
[11:13] on the left is reality and on the right
[11:15] is their four different types of persona
[11:17] constructions. And they didn't realize
[11:19] it at the time, but their persona
[11:20] construction was actually amplifying
[11:22] bias within the model as they got more
[11:24] and more detailed. And they found it was
[11:26] actually throwing it further and further
[11:28] astray from reality. So, you probably
[11:30] have a bunch of different ideas. The
[11:31] answer is you're going to have to test
[11:33] it and validate it against ground truth.
[11:37] The other natural thing you might expect
[11:38] is well, hey, we can fine-tune it,
[11:40] especially if it's missing data that
[11:41] isn't there, especially for example, if
[11:43] it's behaviors or something that
[11:45] wouldn't be in the training text. And
[11:47] this is a great paper to be inspired by
[11:49] for this. This is the Subpop paper.
[11:51] Basically, they construct a prompt
[11:53] template, which is the demographic
[11:54] information, then the survey question
[11:57] they want to ask, and then they compare
[11:59] the known human data distribution to the
[12:01] distribution that comes out of the
[12:02] model, and they do fine-tuning until the
[12:05] model and the human data align.
[12:09] Now, here's the interesting thing.
[12:11] When they did this, as you'd expect,
[12:14] the results that were from the
[12:15] populations they gave to the model,
[12:17] that's the ones in blue, improved.
[12:20] But very interestingly, the ones in
[12:22] white also improved by almost the same
[12:24] degree. Alignment improved even for the
[12:26] unseen groups. That seems almost
[12:29] magical.
[12:30] And some subsequent research has hinted
[12:33] that what might be really happening here
[12:35] is that the model itself has a latent
[12:38] understanding of these groups. It just
[12:41] didn't know how to express it in the
[12:42] format of surveys. And if you think
[12:44] about it,
[12:45] LLMs aren't used to doing surveys as a
[12:47] task. And so they aren't going to be as
[12:49] good as fitting it, especially to a
[12:51] prompt format they may not have seen
[12:53] on the first go-around. But fine-tuning
[12:55] actually is helping it learn the task or
[12:57] how to express itself. So, a lesson you
[13:00] can kind of take away is that your
[13:01] persona that you're looking for is in
[13:03] there. We just need to figure out the
[13:05] way to summon it or elicit it.
[13:08] And that lesson actually takes us to the
[13:09] third technique, which I want to
[13:11] highlight to show how sophisticated your
[13:13] techniques can get if you're just using
[13:16] so-called prompting alone, but using
[13:18] careful calibration and thinking.
[13:21] So,
[13:22] in this one, this team did something
[13:24] very clever. They set up a system prompt
[13:26] that was demographics. They showed a
[13:28] product concept. And then they asked how
[13:30] likely would you be to purchase this
[13:31] product?
[13:33] And they gave it the same scale from one
[13:35] to five, five being most likely, one
[13:36] being the least likely to purchase, like
[13:38] you'd expect, kind of your basic naive
[13:41] prompting pattern.
[13:42] And then they said, "Well, you know,
[13:44] hearkening back to that paper, although
[13:45] I don't know if they were inspired by
[13:46] it,
[13:47] they said, 'Well, large language models
[13:49] aren't used to doing surface, but they
[13:51] are more used to expressing themselves
[13:53] in text.'
[13:54] So, they said as instead of giving us a
[13:56] one to five rating, give us a set of
[13:58] text. So, the example here is, 'I'm
[14:00] somewhat interested. If it works well
[14:02] and isn't too expensive, I might give it
[14:04] a try.'
[14:05] And then to map that text to the one
[14:08] through five willingness to pay, they
[14:11] had humans write out corresponding text
[14:13] for what they would expect. So, if it's
[14:15] a one, "Hell no, I'll never buy that."
[14:17] Five, "Absolutely, I'll buy 20." Right?
[14:20] They had them write out examples of each
[14:22] one of the different options, and then
[14:23] they measured the semantic similarity
[14:26] between the text that came out of the
[14:27] model and those human examples. And that
[14:30] gave them a vector over which they can
[14:33] basically measure a probability
[14:35] distribution of where this text that
[14:36] came out of the model lands. So, what I
[14:38] like about this is it's actually a
[14:39] distribution. Kind of feels like, you
[14:41] know, human. Some days I might say four,
[14:43] some might Some days I might say five in
[14:44] this graph, but rarely would I say one,
[14:46] two, or three in this example.
[14:48] And what they were able to show is that
[14:51] they were not able to only reconstruct
[14:53] accurate values for willingness to pay.
[14:55] They were able to capture the
[14:57] distribution. Because one of the
[14:58] important failure modes we haven't
[14:59] talked about is that LLMs, even when
[15:02] they get the persona averages right,
[15:04] they very often lose the details. The
[15:06] variations get muddled together in the
[15:08] middle.
[15:09] This chart at the bottom,
[15:11] basically that horizontal axis is a
[15:13] measure of the entire shape similarity.
[15:16] And one means perfectly identical, and
[15:18] zero means not. And what you can see is
[15:21] the naive way, in the purple or I guess
[15:23] pink uh doesn't do as well as the yellow
[15:26] which is up near the top of the range.
[15:28] So that means it really did a good job
[15:29] not only understanding what the ultimate
[15:32] choice was but how well that choice
[15:34] varied.
[15:35] Okay. Let's talk about how to measure
[15:38] alignment from a synthetic persona.
[15:41] One of the things that our traditional
[15:43] market research clients are sometimes
[15:46] surprised by and disappointed is that
[15:48] you cannot use statistical
[15:50] synthetic personas to boost statistical
[15:52] significance. You can take an
[15:53] underrepresented population and get more
[15:56] values out of it but you can't say it's
[15:58] statistically significant. And to
[15:59] understand this it helps to go back to
[16:01] that weather analogy. If I want to know
[16:04] how much it rains today in San Francisco
[16:06] and I used to live here so I know it
[16:07] rains a lot, I'd stick a weather gauge.
[16:09] If I want to know with more certainty,
[16:11] I'd stick a thousand weather gauges and
[16:13] those would increase the accuracy of my
[16:15] estimate.
[16:16] But if I want to know if it's going to
[16:18] rain tomorrow, if I take a forecast and
[16:21] I rerun it a thousand times without
[16:23] changing the input, that doesn't change
[16:24] my certainty of that forecast. It
[16:26] improves my estimate of what the model
[16:29] is telling me but it doesn't make the
[16:30] forecast itself more accurate. And
[16:32] that's what happens when you basically
[16:34] are rerunning a synthetic persona with
[16:35] no changes to input. So the lesson is
[16:37] more synthetic samples aren't actually
[16:39] going to improve your statistical
[16:41] significance for the most part.
[16:43] So what you need to do is you need to do
[16:45] what you do with weather forecast. You'd
[16:46] basically check against what actually
[16:49] happened or in our case what humans
[16:51] actually said. And that's where we're
[16:52] going to basically be measuring
[16:54] distributions of data. Unlike classic
[16:56] e-vals where there's clearly a right and
[16:58] wrong and you can score how many were
[16:59] right and how many wrong, now we need to
[17:01] measure the data as a comparison of
[17:03] distributions. And there are many ways
[17:05] for distributions to get wrong. They
[17:07] could be completely wildly off. They can
[17:08] as we mentioned get the average right
[17:10] but the shape of the distribution wrong.
[17:12] And so you're going to need multiple
[17:14] metrics to capture how well your model
[17:16] is reflecting different personas. Um I
[17:19] recommend using a correlation type
[17:21] metric along with one of these shape
[17:23] type metrics which capture what the
[17:25] underlying shape of the distribution is.
[17:28] The other thing you need to do is
[17:30] estimate the fundamental noise in your
[17:31] ground truth data. That experiment I
[17:34] talked about in the beginning where they
[17:35] got 83% accuracy,
[17:38] the key smart thing they did is they
[17:40] took those humans and they brought them
[17:41] back 2 weeks later and they redid the
[17:44] battery of surveys and personality tests
[17:46] and they found that the humans on
[17:47] average were only 80% consistent to
[17:50] themselves.
[17:51] So that sets a noise floor as how
[17:54] accurate our models could ever get
[17:56] because the humans themselves are
[17:57] fundamentally noisy. And so the 83% is
[18:00] actually normalized against that.
[18:03] If you can do this and bring your humans
[18:05] back, that's great. Very often you
[18:07] can't. So the way you can kind of
[18:09] artificially do this is take your ground
[18:11] truth human data, break it into two
[18:13] chunks, and then pretend one is
[18:15] synthetic and one is human, and then
[18:17] measure the correlation and repeat that
[18:18] hundreds and thousands of times and
[18:20] average it, and that'll set kind of a
[18:21] noise floor that your ground truth data
[18:23] where half of it's synthetic, half of it
[18:25] real, could be the level of accuracy you
[18:27] could hope to get.
[18:29] So hopefully by now you have an
[18:31] appreciation for why I think weather
[18:33] forecasts are the best lens to
[18:36] understand synthetic personas. They are
[18:38] not people, they are forecasts, and we
[18:40] should treat them accordingly. Both
[18:42] systems are bounded, both systems will
[18:45] be improving over time, and they're most
[18:47] trustworthy when they're validated
[18:49] against reality.
[18:51] Um
[18:53] Now synthetic personas are very often
[18:55] cast in the market against human
[18:58] research. And I think that's unfortunate
[19:00] because they're actually complementary
[19:01] to each other. Let me give you two
[19:02] reasons why. One is that
[19:05] we're entering an era where humans are
[19:07] no longer the sole economic actor. Every
[19:10] action your human customer is taking in
[19:12] terms of awareness, consideration, or a
[19:14] purchase decision to buy is being
[19:17] increasingly mediated by AI agents. So,
[19:20] a human-only study is actually not the
[19:23] gold truth. What we really need to
[19:25] understand is what does the human plus
[19:27] agent ecosystem look like?
[19:31] And then finally, the alternative to a
[19:33] synthetic persona is not human research.
[19:36] In most cases, it's no research or it's
[19:38] somebody's opinion. What really happens
[19:40] is you've done a survey of humans and
[19:42] you get a question and if it's in the
[19:43] survey, you can just answer it. That's
[19:45] very simple to do. But what typically
[19:47] happens is it's 2 months later and
[19:49] you're like, we need to answer this
[19:50] question which we didn't ask. Well, then
[19:52] somebody needs to be like, "Uh I think
[19:54] it would be this by extrapolation."
[19:57] Uh expert plus a synthetic persona is
[19:59] going to give you a better result to
[20:01] that. So, what we like to tell customers
[20:03] is synthetic extends your human data to
[20:06] more phases of your development process.
[20:08] It can go more places your existing
[20:10] research can't. One of the most exciting
[20:12] directions is to actually run
[20:14] simulations. We didn't get time for
[20:15] this, but it's called generative
[20:17] agent-based modeling where we can take
[20:19] each of these personas and simulate with
[20:21] the dynamics and how they'll interface
[20:23] interface and interact with each other.
[20:25] And ultimately, what this will let you
[20:26] do is turn your human data into a living
[20:30] queryable asset.
[20:33] If you're interested in doing that with
[20:34] your data, feel free to reach out to us.
[20:36] We help market research and insights
[20:38] teams generate and use synthetic
[20:41] personas in AI. You can find us on the
[20:43] web at insights sciences.ai
[20:45] and my contact information is on the
[20:47] slide. I hope you have a good
[20:49] conference. Thank you.
[20:51] >> [applause]
[21:06] [music]
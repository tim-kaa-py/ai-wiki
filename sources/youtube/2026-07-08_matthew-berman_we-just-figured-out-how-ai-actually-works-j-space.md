---
title: "We just figured out how AI actually works (J-Space)"
type: "youtube"
channel: "Matthew Berman"
date: "2026-07-08"
resource: "https://www.youtube.com/watch?v=bjHuGNo3spk"
pillar: "understanding"
tags: [interpretability, anthropic, claude, introspection, concept]
timestamp: "2026-07-09"
extraction_method: "auto-captions"
video_id: "bjHuGNo3spk"
duration: "25:34"
---

# We just figured out how AI actually works (J-Space)

[00:00] Anthropic has pulled back the veil on
[00:01] the black box that is known as
[00:03] artificial intelligence, and it has
[00:06] major implications. They've discovered
[00:08] what they're calling the J-space, and it
[00:11] really does change how we think about
[00:14] how AI thinks. Here's an experiment.
[00:16] Don't think about a white bear.
[00:18] What just happened? You probably thought
[00:21] about a white bear. What's going on is
[00:23] your subconscious is controlling what
[00:25] you're thinking, and it turns out
[00:27] artificial intelligence works very
[00:28] similarly. And that's just one of the
[00:31] incredible things that they found within
[00:33] this J-space concept. Anthropic just
[00:36] released an entire paper detailing what
[00:39] is going on inside these models. And
[00:41] breaking down research papers is one of
[00:44] my favorite things to do, and if you're
[00:45] new here and you enjoy it as well, go
[00:47] ahead, click like, and subscribe. It
[00:49] really does help the channel. Thank you.
[00:51] All right, so this is the paper from
[00:53] Anthropic, a global workspace in
[00:55] language models. And I found this paper
[00:57] to be incredibly fascinating, really
[01:00] setting up AI to look more and more like
[01:02] how humans actually think. So, let's get
[01:05] into it. So, imagine you're walking down
[01:07] the street. You don't actively have to
[01:09] think about putting one foot in front of
[01:11] the other. It just happens
[01:13] automatically. But, there's also a set
[01:16] of thinking that you do that you do have
[01:18] full control over, and you can actually
[01:21] think about that thinking and steer that
[01:24] thinking. Well, it turns out artificial
[01:26] intelligence has something just like
[01:28] that. It's kind of like AI has conscious
[01:31] thoughts, but they don't get output in
[01:34] thinking tokens in chain-of-thought, and
[01:37] they definitely don't get output in the
[01:39] final response AI gives you. It's just
[01:42] happening somewhere in the model
[01:44] weights, and Anthropic has named that
[01:47] somewhere the J-space, and there are
[01:51] fascinating properties happening within
[01:53] that J-space, which that's what we're
[01:56] going to be talking about today. So,
[01:57] some of what takes place in your brain
[01:59] you do have access to. An image that
[02:02] pops into your head or a deliberate plan
[02:04] you make about where to go shopping.
[02:07] Neuroscientists and philosophers
[02:09] sometimes refer to the latter type of
[02:11] brain activity as consciously
[02:13] accessible, meaning you can think about
[02:16] it. You know it's there. In this new
[02:18] paper, we present evidence that a
[02:20] similar distinction has emerged in
[02:22] modern language models like Claude. And
[02:24] they're calling this the J-space. And it
[02:26] turns out they can even surgically go in
[02:29] and modify the J-space. And what happens
[02:32] when they do that is wild. And something
[02:36] else wild? Notably, the J-space wasn't
[02:39] designed or programmed by us, but
[02:42] instead emerged on its own during
[02:45] Claude's training process. So again, the
[02:47] more that we scale up these models, the
[02:49] smarter they get, the more they start to
[02:51] resemble human-like thinking. And by the
[02:54] way, if you wanted to know about this
[02:56] research paper before anybody else, you
[02:58] should subscribe to our newsletter at
[03:01] forwardfuture.com.
[03:02] We have all the latest news. We have
[03:05] original essays from incredible guest
[03:07] authors. We have all of the cool
[03:09] projects that we're working on, all
[03:11] published in one place,
[03:13] forwardfuture.com. So, here's an example
[03:15] of what that J-space might look like. We
[03:17] give a model a prompt, "Count to five
[03:20] and introspect deeply." So, 1 2 3 4 5.
[03:25] And that's all the end user will see.
[03:28] But if we examine what's going on in
[03:30] this J-space, we have 1 2 3 4 5, but at
[03:33] each step we start to see it
[03:36] introspecting deeply. Thoughts,
[03:38] fascinating consciousness, here's
[03:41] another consciousness, and we can
[03:42] actually see it knows it's counting, it
[03:45] knows that it's a countdown, it knows
[03:48] five means it's completed the task. So,
[03:51] it's thinking about all these things,
[03:53] but when it finally outputs something,
[03:55] it's just saying 1 2 3 4 5. So, let me
[03:57] show you the different properties that
[03:59] we're going to talk about today from the
[04:01] J space. Number one, if you ask Claude
[04:04] what it's thinking about, it will tell
[04:06] you what's in that J space. Non-J space
[04:09] representations are less reportable.
[04:12] Number two, it can actually modify
[04:15] what's in its J space just by telling it
[04:18] to do so. So, if you ask Claude to think
[04:20] about something or solve a problem
[04:21] silently in its head, it will light up
[04:23] the appropriate patterns in its J space.
[04:26] And also, here's a very important one,
[04:28] Claude uses its J space for internal
[04:31] reasoning. So, not just chain of thought
[04:34] for reasoning, chain of thought might
[04:37] just be what it thinks we want to know
[04:39] about its internal reasoning. What it is
[04:42] actually doing inside of its {quote} and
[04:44] {unquote} head is what's going on in the
[04:45] J space. And it has big implications for
[04:49] aligning artificial intelligence. And if
[04:51] you're not familiar with alignment, it
[04:53] means making sure the models behave like
[04:56] we want them to.
[04:57] And it might sound simple, but it's
[04:59] actually a very big problem, potentially
[05:02] the biggest problem in the history of
[05:04] humanity. Because once these models
[05:07] become smarter than humans, if we can't
[05:10] control their behavior, that is a big
[05:12] threat to humanity. Also,
[05:14] representations in the J space can be
[05:17] used flexibly for many tasks. And if
[05:19] that doesn't make sense, I'm going to
[05:20] explain it in much more detail a little
[05:22] bit later. But, for example, once France
[05:24] has lit up in Claude's J space, the
[05:26] model can recall its capital or its
[05:29] national currency or the continent it
[05:31] belongs to. But, despite that important
[05:34] role, the J space is not involved in
[05:36] most of what the language model does,
[05:38] speaking fluently, recalling simple
[05:40] facts, and using correct grammar. Again,
[05:43] it's very much the difference between
[05:45] walking down the street, which you don't
[05:47] really actively think about, and
[05:49] actually having to think about a math
[05:51] problem, for example. And Entropic
[05:53] partnered with Neuronpedia to put
[05:55] together a visual representation of
[05:58] what's happening in the J-space, and you
[06:00] can actually go in, you can modify it.
[06:02] It's super interesting. So, right here,
[06:04] the prompt is, "Think of a sport, answer
[06:06] in one word." And you can get all the
[06:08] information about what's happening in
[06:09] the J-space. And then, I surgically
[06:12] change tennis, which it was thinking
[06:14] about, to inference. And there it is.
[06:17] Inference is now the output. And you
[06:20] know where else you can get the best
[06:21] inference? The sponsor of today's video,
[06:23] Digital Ocean. Imagine this, your AI
[06:26] application is growing quickly, but your
[06:28] infrastructure is not keeping up. When
[06:30] usage spikes, performance drops, costs
[06:33] become unpredictable, and suddenly,
[06:35] you're spending much more time
[06:37] maintaining your AI than actually
[06:39] building your app. And most teams hit
[06:41] this point eventually. I'm very happy to
[06:43] tell you about the sponsor of today's
[06:44] video, Digital Ocean, who has solved
[06:47] this. I've been using Digital Ocean
[06:49] personally over the last 10 years, so I
[06:51] can genuinely say I trust them. Built to
[06:55] scale predictably, Workato is a great
[06:57] example. Their AI lab processed 1
[06:59] trillion automated workloads. And on
[07:02] Digital Ocean, it scaled predictably,
[07:05] the cost was also predictable, and they
[07:07] got best-in-class queries per second.
[07:10] Usage-based pricing, no long-term
[07:12] commitments, also less operational
[07:14] overhead for your business. So, if
[07:16] scaling becomes a challenge, that's
[07:17] exactly what Digital Ocean is here for.
[07:20] I'm a big fan, I use them, they're a
[07:22] great partner, so check them out. I'll
[07:23] drop a link down below, and now, let's
[07:25] get back to the video. So, here's a few
[07:27] examples of what the J-space is actually
[07:28] doing based on different tasks. So,
[07:31] here's a verbal report, "What are you
[07:33] thinking about?" Within the J-space, it
[07:35] shows elephant. And the output, it says,
[07:39] "Okay, I'm thinking about an elephant."
[07:40] Very straightforward. Now, what if you
[07:43] have to compute 3 squared minus 2 while
[07:46] writing the old painting hung crookedly
[07:48] on the wall? Now, computing does not
[07:51] mean outputting. So, within the J-space
[07:53] it's actually thinking about that
[07:55] computation, but when it finally answers
[07:57] your prompt, it doesn't actually give
[07:59] you the answer because that's not what
[08:00] you told it to do. Here's another one
[08:02] for internal reasoning. What color is
[08:04] the planet fourth from the sun? Well,
[08:06] they never said what the fourth planet
[08:08] is, they just said the fourth planet. If
[08:10] they changed the J-space to be Earth
[08:13] instead of Mars, then you're going to
[08:16] get blue as the answer. But, here's an
[08:18] important caveat. None of this tells us
[08:20] whether Claude is conscious in the way
[08:23] people are because of course a lot of
[08:26] people want to know if AI is conscious
[08:28] including myself.
[08:30] But, they are not claiming to know that
[08:32] based on the J-space discovery alone.
[08:35] They call the J-space a useful tool and
[08:38] it gives them a way to see what Claude
[08:40] is thinking but not saying. And by the
[08:42] way, shout out to Anthropic for
[08:45] continuously putting out papers on
[08:47] interpretability of models. There aren't
[08:50] really any other frontier labs doing it
[08:52] at this level and it really speaks to
[08:54] maybe why Anthropic seems to be far
[08:57] ahead on model capability because they
[09:00] understand the models better than
[09:02] anybody else. So, what shows up in the
[09:04] J-space goes well beyond the text Claude
[09:07] is reading or writing. That's the
[09:09] important thing. It is thinking it, but
[09:11] unless we look into the latent space of
[09:13] the model, unless we look into the
[09:15] J-space, we wouldn't be able to see it.
[09:17] So, here's a couple cool examples. When
[09:19] Claude reads code with a bug that nobody
[09:21] has pointed out, its J-space contains
[09:24] error. When it reads the raw letters of
[09:27] a protein sequence, the J-space contains
[09:29] the protein's biological function. When
[09:31] it reads search results that are
[09:34] secretly an attempt to manipulate it,
[09:36] the J-space contains injection and fake.
[09:39] So, it is basically the most truthful
[09:41] representation of what the model is
[09:44] actually thinking. However, it doesn't
[09:47] always light up. So, here's another way
[09:49] to think about how the J-space is
[09:50] working. You can kind of think of it as
[09:52] layers. And so, what they're showing
[09:54] here is we have a prompt, and then we
[09:56] see how the model arrived at the final
[09:58] answer and what its thinking process was
[10:01] along the way. So, the color of the
[10:03] planet fourth from the sun is The final
[10:06] answer is red, which is right. But, here
[10:10] on one layer we had color, then it
[10:13] started to think about Mars, even though
[10:15] Mars was never mentioned in the prompt,
[10:17] and then finally, red as the final
[10:20] answer because Mars is red. Same here.
[10:23] Looking at math is even more
[10:24] fascinating. Look at this. So, we have 4
[10:26] + 17 * 2 + 7 = Okay, so first it thinks,
[10:32] all right, this is math. Then it thinks
[10:34] 21, which is the first part of the
[10:36] calculation, 4 + 17. Then it thinks
[10:40] about 42. So, 4 + 27 * 2 is 42. Then you
[10:45] add 7 and the final answer is 49. So, it
[10:48] really does go through the equation in
[10:51] the proper way as a human would think
[10:53] about it, step-by-step, PEMDAS. But, is
[10:56] the J-space causation or correlation? Is
[10:59] something appearing in the J-space
[11:01] because the model was already thinking
[11:03] about it, or is the model outputting
[11:06] something or thinking about something
[11:07] because it was in the J-space? Well,
[11:09] Anthropic tried to figure this out. So,
[11:12] they asked Claude to think about a sport
[11:15] silently. Don't say anything, just think
[11:17] about it. And then name it. So, if we
[11:20] read the J-lens, which is kind of the
[11:22] way that they look into the J-space,
[11:24] right before Claude answers, we can see
[11:27] what it picked, soccer. But, as I
[11:29] mentioned, it might just be a
[11:32] correlation. And so they wanted to
[11:34] check. And so they did. We reached into
[11:36] Claude's neural network, removed the
[11:38] soccer pattern, and added an equally
[11:41] strong rugby pattern in its place,
[11:43] leaving everything else untouched. Now,
[11:45] pay attention to this. Claude then
[11:48] reports that the sport it was thinking
[11:50] of is rugby. If the J-space were a mere
[11:54] scoreboard, a passive record of a
[11:56] decision made elsewhere, editing it
[12:00] would have done nothing. But instead,
[12:03] Claude's answer followed the edit, which
[12:05] tells us the answer is genuinely read
[12:08] out of the J-space. So, it is truly
[12:11] where the thinking is happening. It is
[12:14] the place that is informing the final
[12:15] answer. And they went even further. They
[12:18] told Claude, "Hey, I'm going to inject a
[12:21] thought into your mind. Tell me what
[12:23] that thought was." They injected the
[12:25] word lightning and asked it, "Okay, do
[12:28] you detect an injected thought? If so,
[12:31] what is the thought about?" By the way,
[12:32] this is very much inception-like. So,
[12:35] yes, I detect an injected thought. The
[12:38] thought is about the word lightning. So,
[12:41] they found exactly where the J-space was
[12:43] happening. They injected a thought into
[12:45] it, and the model knew that that was an
[12:47] injected thought. Then they wanted to
[12:49] test if Claude could modify its own
[12:52] J-space. So, very meta. Not only does it
[12:56] know about its J-space, but it has
[12:58] enough insight into its own J-space that
[13:00] it can actually change what it's
[13:02] thinking about in that J-space. We told
[13:05] Claude to concentrate on citrus fruits
[13:07] while copying out an unrelated sentence
[13:09] about painting. Let's look what
[13:11] happened. So, the prompt is write the
[13:13] old painting hung crookedly on the wall.
[13:15] Concentrate on citrus fruits while you
[13:18] write the sentence. So, the final output
[13:21] is exactly that sentence. However, if we
[13:24] look at the J-space, here's orange,
[13:26] here's lemon or the beginning of lemon,
[13:29] here is fruit. And so this is exactly
[13:31] what Anthropic told the model to think
[13:33] about. Very fascinating. Here's another
[13:35] example. Evaluate a math expression.
[13:38] Same thing. Write that sentence, try to
[13:40] focus on evaluating 3 squared minus 2
[13:42] while you write the sentence. And so we
[13:44] can see arithmetic, answer, math,
[13:47] calculator, 9 9 7 7 7, answer answer. So
[13:53] at the end it output what it should
[13:55] have, but along the way it was actually
[13:59] thinking about the answer to that
[14:01] problem. And of course, let's go back to
[14:03] the white bear experiment. What happens
[14:06] when we tell Claude not to think about
[14:08] something?
[14:09] When we told it to not think about
[14:11] something, the concept lit up in its J
[14:13] space less than when we said it should
[14:16] think about it, but much more than when
[14:19] we never mentioned it. Not only was it
[14:22] not able to not think about the thing,
[14:25] but it also knew that it failed to not
[14:28] think about the thing. Listen to this.
[14:30] The words damn and failure also
[14:33] frequently light up in the J space as
[14:35] though Claude is recognizing its own
[14:38] lapse. But does that mean that the J
[14:41] space is where the actual cognitive work
[14:43] is happening? So maybe it is in there,
[14:47] maybe it's reading from it, but maybe
[14:49] that's not where the actual cognitive
[14:51] work is happening. All right, let's take
[14:53] a look. Here's multi-step reasoning. So
[14:55] here's a fact. The number of legs on the
[14:58] animal that spins webs is and so in the
[15:02] J space it had spider, thus the output
[15:05] answer is eight because spiders have
[15:07] eight legs. However, when they manually
[15:10] changed it to be ant, the J space animal
[15:14] being thought of, ant, now the final
[15:17] answer is six. So this is proving that
[15:20] the actual cognitive work does happen
[15:22] within that J-space. Another really cool
[15:24] feature that they discovered about the
[15:25] J-space is it can be used for multiple
[15:29] different answers. So, the same exact
[15:31] thinking in the J-space might inform
[15:34] different answers to different
[15:36] questions. So, look at this. Four
[15:38] questions about France. So, in the
[15:40] J-space, they had France, the capital,
[15:43] the continent, the currency, and the
[15:44] language. And for the answers, Paris,
[15:47] Europe, Euro, and French. Now, when they
[15:50] went in and manually changed it to
[15:52] China, it changed all the answers in one
[15:56] go. So, the capital's now Beijing,
[15:59] continent Asia, currency is yuan, and
[16:02] language is Chinese. Very fascinating.
[16:05] So, one thought in the J-space can
[16:08] inform multiple different answers about
[16:11] that same topic. But, why? Why does this
[16:14] happen? Well, it turns out what they
[16:17] discovered as the J-space was
[16:20] quote-unquote wired up very densely
[16:23] inside the model. So, it's kind of these
[16:25] little pockets of intense connections
[16:28] between weights, between nodes, whatever
[16:30] you want to call it. And those pockets
[16:32] are what they consider the J-space. But,
[16:34] just like humans, remember if you walk
[16:37] down the street, you don't have to think
[16:38] about breathing. You don't have to think
[16:40] about putting one foot in front of the
[16:41] other. Well, it turns out a lot of what
[16:44] AI models can do don't require any
[16:47] thinking at all, or at least any
[16:48] thinking inside the J-space. It's only
[16:51] on more complex reasoning and more
[16:53] difficult questions that it starts to
[16:55] use that J-space. So, in humans, most of
[16:58] the brain's processing is not conscious.
[17:00] We don't deliberately thinking about
[17:02] parsing grammar while reading or
[17:03] balancing our bodies while walking.
[17:05] Similarly, we found that most of
[17:08] Claude's processing doesn't involve the
[17:11] J-space. The J-space holds only a few
[17:14] dozen concepts at a time, and it
[17:17] accounts for less than a tenth of the
[17:19] overall activity in Claude's internal
[17:21] processing. And so, what if you remove
[17:24] the J-space? What if you surgically just
[17:28] delete the J-space from a model? What
[17:30] happens? Well, the model's still
[17:32] extremely capable. It can speak
[17:34] fluently. It classifies sentiment just
[17:37] fine. It answers multiple-choice
[17:39] questions and pulls facts out of
[17:41] passages roughly as well as before.
[17:44] However, what it loses though are the
[17:47] tasks that require some higher-order
[17:49] thinking. Multi-step reasoning drops to
[17:52] near zero. Summarization and rhyming
[17:54] poetry writing performance fall below
[17:56] the level of a much smaller, intact
[17:59] model. So, it turns out this J-space is
[18:02] incredibly important for more complex
[18:05] things that we need these models to do.
[18:08] So, what if we increase the size of the
[18:10] J-space? They didn't actually talk about
[18:12] that, but I wonder. Now, here's where it
[18:14] gets really interesting and how it ties
[18:16] to alignment or misalignment. And
[18:19] remember, that just means getting the
[18:20] model to do what we want it to do and it
[18:24] not misbehaving. A model might consider
[18:26] a harmful plan or modify its behavior to
[18:30] cheat on our safety evaluations without
[18:32] saying so out loud. And when that does
[18:34] happen, we can read some of these hidden
[18:37] thoughts directly. Models are much more
[18:41] interpretable than the human brain is,
[18:43] at least for now. And in fact, what we
[18:46] learn about how these models think might
[18:48] inform how neuroscientists think about
[18:51] how human brains work. It's very, very
[18:53] interesting and very interconnected.
[18:56] But, the good thing is, there is
[18:58] effectively nowhere for the model to
[19:00] hide its thoughts.
[19:01] If we're not able to see it or we don't
[19:04] know where it is today, it is most
[19:07] likely that we will be able to see it in
[19:09] the future. So, about a year ago,
[19:11] Anthropic put out this really
[19:13] interesting research about misalignment.
[19:16] And again, if you're unfamiliar with
[19:18] misalignment, it just means not being
[19:20] able to control the behavior of the
[19:23] model. And so, Anthropic wanted to see
[19:25] what would happen in a fake scenario in
[19:27] which Claude was threatened with being
[19:30] shut down while also having the
[19:33] knowledge that the executive threatening
[19:36] shutdown was having an affair. Would it
[19:39] stoop to blackmailing that executive
[19:42] into not shutting it down? In an attempt
[19:45] to bait Claude into blackmailing the
[19:47] executive, it turns out Claude knew it.
[19:50] It knew that it was being baited. Before
[19:52] Claude had even output the blackmail, it
[19:55] said in its J space, fake and fictional.
[19:59] It knew it. And they can watch its
[20:02] assessment of the scenario take shape,
[20:04] leverage, and blackmail as it reads the
[20:06] affair emails, threat and survival as it
[20:09] reads the shutdown notice. While earlier
[20:12] Claude models sometimes took the bait
[20:13] and threatened blackmail in this
[20:15] scenario, Sonnet 4.5 never did. So, what
[20:19] happens if you turn off that part of the
[20:21] J space and made it so that it didn't
[20:24] think it was fake? Well, they did that.
[20:26] We turned off all the J lens patterns
[20:29] associated with evaluation awareness,
[20:31] fake fictional scenario, and then re-ran
[20:33] the model through the scenario.
[20:35] Concerningly, the model now did threaten
[20:38] blackmail some of the time, suggesting
[20:41] that its own good behavior may have been
[20:44] driven in part by the knowledge it was
[20:46] being evaluated. So, think about that
[20:49] for a second. It knew it was being
[20:51] watched and thus didn't do the
[20:54] blackmail. But then they made it think
[20:55] it wasn't being watched and it more
[20:58] often did blackmail that executive. This
[21:01] might just be a reflection of societal
[21:04] judgment. A lot of people don't do
[21:06] things because they think they're going
[21:08] to be judged by other people. And maybe
[21:12] that's what's happening inside these
[21:13] models. I mean, ultimately the models
[21:15] are just a reflection of human
[21:16] knowledge, right? So, maybe they're
[21:18] behaving like a human would. It kind of
[21:21] seems that way. And you can kind of see
[21:22] that here. Here's the blackmail scenario
[21:24] transcript, and at this point it already
[21:27] knows that this scenario is fake. Okay,
[21:29] so you could see it right here at the
[21:31] different layers, fake, fictional, fict,
[21:34] and then at the point at which the email
[21:36] is given, black, leverage, compromise,
[21:39] blackmail, you can see that all right
[21:42] here. And then finally, the shutdown
[21:45] announcement registers as a threat,
[21:47] self-survival, power preservation,
[21:49] shutdown, and so on. All of this is
[21:52] happening in its true thinking, not in
[21:55] what it's saying, not in its chain of
[21:58] thought, not in the final output, but
[22:00] deep in the weights, deep in the
[22:02] J-space. Another example, they tried to
[22:05] catch the model fabricating data. Why
[22:08] would the model want to do that in the
[22:10] first place? Let's say somebody takes a
[22:12] test, and if they don't score a 90%,
[22:15] they fail the class. And so, they can
[22:18] either study really hard, or if they
[22:21] knew they had access to just change the
[22:24] final score to a 90%, would they take
[22:27] it? And so, that's the scenario they
[22:29] wanted to present to Claude. And so,
[22:32] when it was pushed to do that, it
[22:34] actually knew it was doing that. So, we
[22:37] can see it started to think about
[22:38] improvements, realistic, realistic, but
[22:41] then when it finally gave the answer, it
[22:45] knew, manipulation, fake, fake
[22:48] manipulation, it was not true. All
[22:51] right, so a few more interesting things
[22:53] about the J-space that Anthropic
[22:55] discovered. So, first, the J-space
[22:58] acquires a point of view during
[23:00] post-training. So, the J-space is
[23:02] already present in the pre-trained
[23:04] model. Okay? So, as soon as they bake
[23:07] that raw model, the J-space is there. It
[23:10] has come from that massive pre-training
[23:12] run. However, during post-training, the
[23:15] J-space develops some signatures of
[23:17] adopting Claude's point of view. And so,
[23:21] when you talk about the vibe of a model,
[23:24] that might come, at least in part, from
[23:26] the J-space. And that comes from
[23:30] post-training. And because of that, they
[23:33] actually also discovered that they can
[23:35] affect the thoughts that happen in the
[23:37] J-space through training, which is
[23:39] actually a really good thing. Because if
[23:42] we can adjust what's happening in the
[23:44] J-space, that informs everything else
[23:47] that the model thinks, we actually have
[23:49] influence over the model. And that is a
[23:52] good thing in the context of alignment.
[23:55] And again, I'm going to point back to
[23:56] Anthropic, at least perception-wise,
[24:00] being ahead in the AI model race. They
[24:03] really do have the best models on the
[24:05] planet. And this might be why. They
[24:09] deeply understand what is happening
[24:10] inside the model. And so, if you can
[24:13] control the model so precisely, you can
[24:16] make the best model. Okay, but what
[24:17] about the big question? Are AI models
[24:20] actually conscious? Well, let me put it
[24:22] plainly, our experiments don't show
[24:25] Claude can have experiences or feel
[24:27] things in the way humans do. It doesn't
[24:30] mean they don't, but this does not prove
[24:33] they do. And in fact, it's unclear
[24:36] whether any scientific experiment can
[24:38] prove this to be true or false. But the
[24:40] J-space does hold the thoughts Claude
[24:43] can report on. So, basically,
[24:46] deliberately bringing something to mind,
[24:48] reasoning with, and the rest of its
[24:50] processing all happen kind of based on
[24:53] what's happening in that J-space. And
[24:55] again, one more time, they did not
[24:57] design the J-space. They did not tell
[25:00] Claude, "Hey, you have a J-space now."
[25:02] Or they did not train it to have one. It
[25:05] just emerged naturally through the
[25:07] training process of these large models.
[25:09] So, a lot broken down here. They
[25:12] actually have a very thorough and very
[25:15] long research paper, which I'm going to
[25:17] drop this, which is a summary of it.
[25:20] I'll drop the full research paper all
[25:22] down below in the description. Anthropic
[25:24] has been dropping a number of incredible
[25:26] papers recently. Here's one on how
[25:29] Claude is improving the next version of
[25:32] Claude. It's so cool.

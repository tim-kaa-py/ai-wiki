# Ingest Notes

**Source:** [Claude Routines Just Dropped, And It's Perfect](https://www.youtube.com/watch?v=j3aXJNu9804)

## User Focus
- Basic concept of Claude Routines and how to use it
- Different ways routines can be triggered (schedule, webhook, API call, GitHub event)
- Interconnection of routines with one another and with external services (connectors: Gmail, Slack, Fireflies, etc.)
- Possible use cases for routines
- Process automation comparison with n8n — advantages and disadvantages

## Confirmed Discoveries
- A. [09:54] Routine prompts must be more precise than interactive skills — routines run fully hands-off with no ability to steer mid-run; decrease scope of possible errors by being as clear and precise as possible
- B. [05:46] Managed sessions for inter-agent orchestration — routines can call other AI agents in siloed, secure containers; concrete multi-agent architecture pattern
- D. [11:06] No apparent length limit on routine prompts — Nick tested it; recommends leaning toward more context rather than less
- E. [16:42] Chained routine architecture for full sales pipeline — call → Fireflies webhook → transcript routine → proposal + workflow diagram → signature monitor → onboarding routine; event-driven multi-step pipeline in natural language

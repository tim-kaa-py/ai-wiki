---
title: "Claude Code Session Priming — Automated Setup"
intent: "Wake the PC at 07:00 and 12:00 on weekdays to silently prime Claude Code's 5-hour session window, gaining a 3rd usable window per workday."
prerequisites:
  - "Windows 10/11"
  - "Claude Code CLI installed and authenticated"
  - "PC set to Sleep (not Shutdown) when idle"
  - "Admin PowerShell for the one-time wake-timer enable + task import"
model: "sonnet"
tags: [claude-code, windows, automation, task-scheduler, session-management, productivity]
created: "2026-05-06"
---

# Claude Code Session Priming — Automated Setup

## Context

Claude Code Enterprise uses rolling **5-hour session windows**. The window starts the moment you send your first message after the previous one expired. By default most people get 2 sessions during a workday. This setup opens a third by priming a session silently at 07:00 — before you even sit down — so your first window runs 07:00–12:00. The second prime at 12:00 covers the afternoon until 17:00.

**Result:** 3 usable session windows per workday (07:00–12:00, 12:00–17:00, and a natural evening window if needed) instead of 2.

**Mechanism:** Windows Task Scheduler wakes the PC from S3 sleep at 07:00 and 12:00 on weekdays, runs `claude -p "prime"` silently via a VBScript wrapper (no visible window), and goes back to sleep.

---

## Prerequisites

- Windows 10/11
- Claude Code CLI installed and authenticated (`claude` command works in your terminal)
- PC set to Sleep (not Shut down) when idle
- Claude Code Enterprise plan (or any plan with 5-hour session limits)

---

## Step 1 — Find your `claude.exe` path

Run in PowerShell:

```powershell
Get-Command claude | Select-Object -ExpandProperty Source
```

Note the full path. You will need it in Step 2. Example: `C:\Users\YourName\.local\bin\claude.exe`

---

## Step 2 — Create the scripts folder and files

Create the folder:

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\scripts"
```

Create the VBScript wrapper (replace the path with your actual `claude.exe` path from Step 1):

```powershell
@'
Set oShell = CreateObject("WScript.Shell")
oShell.Run """C:\Users\YourName\.local\bin\claude.exe"" -p ""prime""", 0, True
'@ | Set-Content "$env:USERPROFILE\.claude\scripts\claude-prime.vbs"
```

---

## Step 3 — Create the Task Scheduler XML files

**07:00 task** — save as `$env:USERPROFILE\.claude\scripts\ClaudeCodePrime_0700.xml`:

```xml
<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.4" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
  <RegistrationInfo>
    <Description>Prime Claude Code 5-hour session window at 07:00 on weekdays</Description>
    <URI>\ClaudeCodePrime_0700</URI>
  </RegistrationInfo>
  <Triggers>
    <CalendarTrigger>
      <StartBoundary>2026-01-05T07:00:00</StartBoundary>
      <Enabled>true</Enabled>
      <ScheduleByWeek>
        <WeeksInterval>1</WeeksInterval>
        <DaysOfWeek>
          <Monday/><Tuesday/><Wednesday/><Thursday/><Friday/>
        </DaysOfWeek>
      </ScheduleByWeek>
    </CalendarTrigger>
  </Triggers>
  <Principals>
    <Principal id="Author">
      <UserId>YourWindowsUsername</UserId>
      <LogonType>InteractiveToken</LogonType>
      <RunLevel>LeastPrivilege</RunLevel>
    </Principal>
  </Principals>
  <Settings>
    <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
    <DisallowStartIfOnBatteries>false</DisallowStartIfOnBatteries>
    <StopIfGoingOnBatteries>false</StopIfGoingOnBatteries>
    <WakeToRun>true</WakeToRun>
    <ExecutionTimeLimit>PT5M</ExecutionTimeLimit>
    <Priority>7</Priority>
    <RestartOnFailure>
      <Interval>PT1M</Interval>
      <Count>3</Count>
    </RestartOnFailure>
  </Settings>
  <Actions Context="Author">
    <Exec>
      <Command>wscript.exe</Command>
      <Arguments>//Nologo "C:\Users\YourName\.claude\scripts\claude-prime.vbs"</Arguments>
      <WorkingDirectory>C:\Users\YourName</WorkingDirectory>
    </Exec>
  </Actions>
</Task>
```

**12:00 task** — save as `$env:USERPROFILE\.claude\scripts\ClaudeCodePrime_1200.xml`:

Same XML as above but change:
- `<URI>\ClaudeCodePrime_1200</URI>`
- `<StartBoundary>2026-01-05T12:00:00</StartBoundary>`

Replace all three occurrences of `YourName` and `YourWindowsUsername` with your actual values.

---

## Step 4 — Enable wake timers (admin PowerShell, once)

```powershell
powercfg /setacvalueindex SCHEME_CURRENT SUB_SLEEP RTCWAKE 1
powercfg /setactive SCHEME_CURRENT
```

---

## Step 5 — Import the tasks (admin PowerShell)

```powershell
schtasks /create /xml "$env:USERPROFILE\.claude\scripts\ClaudeCodePrime_0700.xml" /tn "ClaudeCodePrime_0700"
schtasks /create /xml "$env:USERPROFILE\.claude\scripts\ClaudeCodePrime_1200.xml" /tn "ClaudeCodePrime_1200"
```

---

## Step 6 — Test

```powershell
schtasks /run /tn "ClaudeCodePrime_0700"
```

No window should appear. To enable history logging so you can verify future runs: open **Task Scheduler → Actions → Enable All Tasks History**.

---

## Notes

- The prime prompt costs essentially zero tokens — it sends "prime" and Claude responds with a few words, then exits.
- Session windows: 07:00–12:00 (morning), 12:00–17:00 (afternoon), plus a natural evening window whenever you first message Claude after 17:00.
- If your PC is fully shut down (not sleeping) the task will be missed. Make sure your idle power setting is **Sleep**, not **Shut down**.
- This setup only addresses the per-session limit, not any account-level caps your Enterprise plan may have. If you are consistently hitting limits even with priming, contact your Anthropic account manager about usage quotas.

# Workflow screenshots

Drop your n8n canvas screenshots in **this folder**. Each file must be named
exactly as listed below (lowercase, `.png`). When a file is here, its card on
the live site automatically shows the real canvas instead of the diagram.

## Filename → which workflow to open in n8n

| Save the screenshot as… | Open this workflow in n8n |
|---|---|
| `instant-lead-response.png`     | Instant lead response & qualification (portfolio demo) |
| `support-triage.png`            | AI support triage with approval (portfolio demo) |
| `community-moderation.png`      | Community moderation assistant (portfolio demo) |
| `customer-research-engine.png`  | Customer Research Engine — 9-channel VOC mining (portfolio demo) |
| `deal-won-cascade.png`          | Deal Won → whole-company cascade (portfolio demo) |
| `hr-onboarding-assistant.png`   | HR Onboarding Assistant — RAG over the handbook (portfolio demo) |
| `overdue-invoice-chaser.png`    | Overdue invoice chaser (portfolio demo) |
| `receipts-to-books.png`         | Receipts to bookkeeping (portfolio demo) |
| `meeting-notes-to-tasks.png`    | Meeting notes to tasks (portfolio demo) |
| `content-repurposing.png`       | One blog post into ten (portfolio demo) |
| `pre-call-prep-brief.png`       | Pre-call prep brief (portfolio demo) |
| `employee-offboarding.png`      | Employee offboarding (portfolio demo) |
| `daily-kpi-brief.png`           | Daily KPI brief (portfolio demo) |

## How to take each screenshot

1. Open **n8n.copyweb.io** and log in.
2. Open the workflow (name from the table above).
3. Click **Execute Workflow** (bottom centre) so every node shows a green ✓.
4. Press **1** (or the fit-view button, bottom-left) so the whole flow fits on screen.
5. Capture the canvas — Windows: **Win + Shift + S**, drag a box around the flow.
6. Save it as a **PNG** using the exact filename from the table, into this folder.
7. Tell Claude "screenshots added" and it will redeploy — the cards update live.

## Tips
- Landscape orientation, roughly 1400–1800px wide is ideal.
- You don't have to do all 13 at once — add any subset; the rest keep their diagrams.
- Keep each file under ~500KB if you can (PNG is fine; compress if large).

---

# Workflow JSON exports (the "Download workflow" link)

Each card can also offer a **Download workflow (.json)** link — the real n8n
export, so a technical reviewer can import it into their own n8n. The link only
appears on a card once its `.json` file is in this folder.

## How to export each one
1. Open the workflow in **n8n.copyweb.io**.
2. Top-right **⋮ (three dots) menu → Download**.
3. n8n saves a `.json` file. **Rename it to the exact name below** and drop it
   in this folder (same names as the screenshots, just `.json`).

| Save the export as… | Workflow |
|---|---|
| `instant-lead-response.json`     | Instant lead response & qualification |
| `support-triage.json`            | AI support triage with approval |
| `community-moderation.json`      | Community moderation assistant |
| `customer-research-engine.json`  | Customer Research Engine — 9-channel VOC mining |
| `deal-won-cascade.json`          | Deal Won → whole-company cascade |
| `hr-onboarding-assistant.json`   | HR Onboarding Assistant — RAG over the handbook |
| `overdue-invoice-chaser.json`    | Overdue invoice chaser |
| `receipts-to-books.json`         | Receipts to bookkeeping |
| `meeting-notes-to-tasks.json`    | Meeting notes to tasks |
| `content-repurposing.json`       | One blog post into ten |
| `pre-call-prep-brief.json`       | Pre-call prep brief |
| `employee-offboarding.json`      | Employee offboarding |
| `daily-kpi-brief.json`           | Daily KPI brief |

Then tell Claude "JSONs added" and it'll redeploy. Each card's download link
appears automatically.

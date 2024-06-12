import os
import base64
import requests
from datetime import datetime, timedelta
import datetime
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
# Environment Variables
mapped_ado_pat = os.getenv("PAT_KEY")
org_uri = os.getenv("ORG_URI")
org_name = org_uri.replace("https://dev.azure.com/", "").rstrip("/")
project = os.getenv("PROJECT")
repository_id = os.getenv("REPOSITORY_ID")
# Basic Auth Header
pair = f":{mapped_ado_pat}"
base64_pair = base64.b64encode(pair.encode("ascii")).decode("ascii")
headers = {"Authorization": f"Basic {base64_pair}"}

# URL
url = f"https://advsec.dev.azure.com/{org_uri}/{project}/_apis/alert/repositories/{repository_id}/alerts?api-version=7.2-preview.1"
print(url)
# Request Alerts
response = requests.get(url, headers=headers)
if response.status_code != 200:
    print(
        f"##vso[task.logissue type=error] Error getting alerts from Azure DevOps Advanced Security: {response.status_code}, {response.reason}"
    )
    exit(1)

parsed_alerts = response.json()

severities = ["low", "medium", "critical", "high", "error", "warning", "note"]
states = ["active"]
sla_days = 10
alert_types = ["code", "secret", "dependency"]

failing_alerts = []

# Check Alerts
for alert in parsed_alerts.get("value", []):
    if (
        alert.get("severity") in severities
        and alert.get("state") in states
        and alert.get("alertType") in alert_types
    ):

        failing_alerts.append(
            {
                "Alert Title": alert.get("title"),
                "Alert Id": alert.get("alertId"),
                "Alert Type": alert.get("alertType"),
                "Severity": alert.get("severity"),
                "Description": alert.get("rule", {}).get("description"),
                "First Seen": alert.get("firstSeenDate"),
                # "Days overdue": (datetime.utcnow() - first_seen_date).days - sla_days,
                "Alert Link": f"{alert.get('repositoryUrl')}/alerts/{alert.get('alertId')}",
            }
        )

# Output Result
if failing_alerts:
    print(
        f"##vso[task.logissue type=error] Found {len(failing_alerts)} failing alerts out of SLA policy:"
    )
    for alert in failing_alerts:
        for key, value in alert.items():
            print(f"{key}: {value}")
        print("\n")
    exit(1)
else:
    print("##vso[task.complete result=Succeeded;]DONE")
    exit(0)

[![OpenFaaS](https://img.shields.io/badge/openfaas-cloud-blue.svg)](https://www.openfaas.com) 
![CI](https://github.com/mrsimpson/ical-interceptor/workflows/CI/badge.svg)

# iCal Interceptor

This contains an [OpenFaas](https://www.openfaas.com/) function to fetch and manipulate an ical shared calendar.

## How to use it

Supply a `?url=<your ical calendar URL>` as url query parameter and add some modifiers.

### Supported modifiers

| Modifier | Effect | Status |
| -------- | ------ |:------:|  
| `remindBeforeStart=<minutes>` | adds a reminder ro each event | ✅ |
| `filter.<iCal component name>=<value>` | returns only the events which math a certain value. RegExp implicitly applied |
| `filter.summary=^call` | will return only events with a summay which starts with `Call` (case insensitive) |

### My personal usecase

_I only have one body, I only have one availability - I should have only one calendar_

However, I need to track my employer's calendar appointments during the day. At the same time, I failed to use corporate mobile hardware and I am not allowed to bring my own device.
However, we use Office 365 at work. And Outlook of the O365 allows me to publish a public availability calendar. But without alarms...

This is my config: Add a reminder and filter out those events which start at one minute after the hour (I've got a convention I don't need them to be reminded of). :tada:
https://mrsimpson.o6s.io/ical-interceptor?url=https://outlook.office365.com/owa/calendar/.../reachcalendar.ics&remindBeforeStart=30&filter.DTSTART=T\d{2}(?!0100)

## Test it?

Thanks to the more than generous option to run the function on the [OpenFaas Community cluster](https://github.com/openfaas/community-cluster/tree/master/docs), the function is available at `https://mrsimpson.o6s.io/ical-interceptor`.

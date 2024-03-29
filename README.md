[![OpenFaaS](https://img.shields.io/badge/openfaas-cloud-blue.svg?style=flat)](https://www.openfaas.com) 
![CI](https://github.com/mrsimpson/ical-interceptor/workflows/CI/badge.svg?style=flat)
[![codecov](https://codecov.io/gh/mrsimpson/ical-interceptor/branch/master/graph/badge.svg?style=flat)](https://codecov.io/gh/mrsimpson/ical-interceptor)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fmrsimpson%2Fical-interceptor%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/mrsimpson/ical-interceptor/master)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat)](https://opensource.org/licenses/Apache-2.0)

# iCal Interceptor

This contains an [OpenFaas](https://www.openfaas.com/) function to fetch and manipulate an ical shared calendar.

## How to use it

Supply a `?url=<your ical calendar URL>` as url query parameter to the enpoint you exposed the function to and add some modifiers.

Supply `&download` as url query parameter in order to make your browser download the result as a file.

Thanks to the more than generous option to run the function on the [OpenFaas Community cluster](https://github.com/openfaas/community-cluster/tree/master/docs), the function is available at `https://mrsimpson.o6s.io/ical-interceptor`.

### Supported modifiers

| Modifier | Effect | Status |
| -------- | ------ |:------:|  
| `remindBeforeStart=<minutes>` | adds a reminder ro each event | ✅ |
| `filter.<iCal component name>=<value>` | returns only the events which math a certain value. RegExp implicitly applied | ✅ |
| `filter.summary=^call` | will return only events with a summay which starts with `Call` (case insensitive) | ✅ |

### My personal usecase

_I only have one body, I only have one availability - I should have only one calendar_

However, I need to track my employer's calendar appointments during the day. At the same time, I failed to use corporate mobile hardware and I am not allowed to bring my own device.
However, we use Office 365 at work. And Outlook of the O365 allows me to publish a public availability calendar. But without alarms...

This is my config: Add a reminder and filter out those events which start at one minute after the hour (I've got a convention I don't need them to be reminded of). :tada:
https://mrsimpson.o6s.io/ical-interceptor?url=https://outlook.office365.com/owa/calendar/.../reachcalendar.ics&remindBeforeStart=30&filter.DTSTART=T\d{2}(?!0100)

## Run it locally

Get a local installation of OpenFaaS. If you've got a docker host running on your machine, it is super simple thanks to k3d and k3sup - check the [OpenFaaS workshop for very detailed instructions](https://github.com/openfaas/workshop) on how to get things running. No worries, you'll need not more than ten minutes (depending on your internet connection 😉)

Afterwards, there's a one-liner to deploy locally:

```sh
faas-cli up -f dev.yml --image=<your docker user>/ical-interceptor
```

This will build the function as docker image, push it to your docker hub repository and deploy the function to your local cluster 

_Caution: make sure to eventually adapt the gateway (I'm exposing it at `30001`) in `dev.yml` or supply the port via `--gateway`)_

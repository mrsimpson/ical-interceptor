[![OpenFaaS](https://img.shields.io/badge/openfaas-cloud-blue.svg)](https://www.openfaas.com)

# iCal Interceptor

This contains an [OpenFaas](https://www.openfaas.com/) function 

## How to use it

Supply a `?url=<your ical calendar URL>` as url query parameter and add some modifiers.

### Supported modifiers

| Modifier | Effect | Status |
| -------- | ------ |:------:|  
| `remindBeforeStart=<minutes>` | adds a reminder ro each event | ✅ |
| `filter.<iCal component name>=<value>` | returns only the events which math a certain value. RegExp implicitly applied |
| `filter.summary=^call` | will return only events with a summay which starts with `Call` (case insensitive) |

## Test it?

Thanks to the more than generous option to run the function on the [OpenFaas Community cluster](https://github.com/openfaas/community-cluster/tree/master/docs), the function is available at `https://mrsimpson.o6s.io/ical-interceptor`.

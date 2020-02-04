# iCal Interceptor

This contains an [OpenFaas](https://www.openfaas.com/) function 

## How to use it

Supply a `?url=<your ical calendar URL>` as url query parameter and add some modifiers.

### Supported modifiers

| Modifier | Effect | Status |
| -------- | ------ |:------:|  
| `remindBeforeStart=<minutes>` | adds a reminder ro each event | ✅ |
| `status=<confirmed,tentative,free>` | returns only the events which match a status, comma separate multiple values | [#1](https://github.com/mrsimpson/ical-interceptor/issues/1) |

## Test it?

Thanks to the more than generous option to run the function on the [OpenFaas Community cluster](https://github.com/openfaas/community-cluster/tree/master/docs), the function is available at `https://mrsimpson.o6s.io/ical-interceptor`.

# Rails Application Stack

##  Prepare docker
```bash
sysctl vm.overcommit_memory=1

echo never > /sys/kernel/mm/transparent_hugepage/enabled
echo never > /sys/kernel/mm/transparent_hugepage/defrag
```
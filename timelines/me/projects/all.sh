#!/bin/bash

# escalade / yoga / apnée / plongée / crunching / moutaineering

# MYCROFT #
###########

git checkout projects
git checkout -b mycroft
/bin/bash ./2019-07_mycroft.sh
git checkout projects
git merge --no-ff mycroft

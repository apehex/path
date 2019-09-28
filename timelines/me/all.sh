#!/bin/bash

# TIMELINE START #
##################

git checkout master
touch timeline-me-root
git add .
git commit --date="2005-09-01" --message="Starting my studies"

# TRAININGS #
#############

git checkout master
git checkout -b trainings
/bin/bash ./trainings/all.sh
git checkout master
git merge --no-ff trainings

# WORK #
########

git checkout master
git checkout -b work
/bin/bash ./work/all.sh
git checkout master
git merge --no-ff work

# PROJECTS #
############

git checkout master
git checkout -b projects
/bin/bash ./projects/all.sh
git checkout master
git merge --no-ff projects

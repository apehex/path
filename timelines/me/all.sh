#!/bin/bash

# TIMELINE START #
##################

git checkout master
touch timeline-me-root
git add .
git commit --date="2005-09-01" --message="Starting my studies"

# TRAININGS #
#############

/bin/bash ./trainings/all.sh

# WORK #
########

/bin/bash ./work/all.sh

# PROJECTS #
############

/bin/bash ./projects/all.sh

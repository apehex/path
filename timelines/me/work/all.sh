#!/bin/bash

# TRAJECT #
###########

# TUTORING #
############

# C3 #
######

# TECHNICAL STUDIES #
#####################

# BIKING #
##########

# ECS #
#######

# WEB DEV #
###########

git checkout master
git checkout -b web-development
/bin/bash ./2019-01_2019-12_web-development.sh
git checkout master
git merge --no-ff web-development

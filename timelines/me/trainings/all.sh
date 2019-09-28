#!/bin/bash

# PREPA #
#########

git checkout trainings
git checkout -b carnot-prepa-mp
/bin/bash ./2005-09_2008-09_carnot_prepa-mp.sh
git checkout trainings
git merge --no-ff carnot-prepa-mp

# ECL #
#######

git checkout trainings
git checkout -b ecl-general-engineering
/bin/bash ./2008-09_2012-09_ecl_general-engineering.sh
git checkout trainings
git merge --no-ff ecl-general-engineering

# COURSERA : L2L #
##################

git checkout trainings
git checkout -b coursera-learning-to-learn
/bin/bash ./2015-11_2015-12_coursera_learning-to-learn.sh
git checkout trainings
git merge --no-ff coursera-learning-to-learn

# COURSERA : ML #
#################

git checkout trainings
git checkout -b coursera-machine-learning
/bin/bash ./2015-07_2015-09_coursera_machine-learning.sh
git checkout trainings
git merge --no-ff coursera-machine-learning

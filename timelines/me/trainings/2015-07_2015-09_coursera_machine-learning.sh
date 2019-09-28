#!/bin/bash

# MACHINE LEARNING #
####################

echo "|" >> ./technical/computing/languages/scientific/octave
echo "|" >> ./technical/computing/languages/scientific/matlab
git add .
git commit --date="2016-07-01T00:00:00" --message="Translate my knowledge of Matlab to Octave"
git tag "Completed 'ML' on Coursera" HEAD

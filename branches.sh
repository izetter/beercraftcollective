#!/bin/bash
for branch in $(git branch --all | grep '^\s*remotes' | egrep --invert-match '(:?HEAD|main)$'); do
    git branch --track "${branch##*/}" "$branch"
done

# This script is to track all remote branches of a repo (except the main/master)
# You have to first git clone on the main/master branch as usual
# Then run the script
# git fetch --all and git pull --all may still be needed
#https://stackoverflow.com/a/4754797
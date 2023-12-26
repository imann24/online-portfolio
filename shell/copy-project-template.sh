#!/usr/bin/env bash

# copies the projects/template/index.html file into all the project directories

template_dir="projects/template/";
project_dirs=($(find "projects" -type d))
for dir in "${project_dirs[@]}"; do
     if [[ {}$dir == *"/"* ]]; then
          if [[ {}$dir != *"template"* ]]; then
               cp -R $template_dir. $dir
          fi
     fi
done

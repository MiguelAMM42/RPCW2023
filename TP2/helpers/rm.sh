#!/bin/bash

xmlDir="out/xml"
htmlDir="out/html"
cd "$xmlDir"
rm *.xml
cd ".."
cd "$htmlDir"
cd ".."
rm *.html

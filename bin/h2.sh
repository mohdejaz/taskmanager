#!/bin/sh

java -cp h2-1.4.200.jar org.h2.tools.Server -tcp -tcpAllowOthers -pg -pgAllowOthers -baseDir ../data -ifNotExists
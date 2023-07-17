@echo off
rem @java -cp "h2-1.4.200.jar;%H2DRIVERS%;%CLASSPATH%" org.h2.tools.Console %*
rem @if errorlevel 1 pause
start /min java -cp h2-1.4.200.jar org.h2.tools.Server -tcp -tcpAllowOthers -pg -pgAllowOthers -baseDir ../data -ifNotExists
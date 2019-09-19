EESchema Schematic File Version 4
LIBS:1U-cache
EELAYER 29 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L MX_Alps_Hybrid:MX-NoLED MX0
U 1 1 5D5FEB52
P 1375 1100
F 0 "MX0" H 1408 1323 60  0000 C CNN
F 1 "MX-NoLED" H 1408 1249 20  0000 C CNN
F 2 "" H 750 1075 60  0001 C CNN
F 3 "" H 750 1075 60  0001 C CNN
	1    1375 1100
	0    -1   -1   0
$EndComp
$Comp
L Device:D_Small D1
U 1 1 5D5F5496
P 950 1050
F 0 "D1" V 1125 1000 50  0000 L CNN
F 1 "D_Small" H 775 1200 50  0000 L CNN
F 2 "" V 950 1050 50  0001 C CNN
F 3 "~" V 950 1050 50  0001 C CNN
	1    950  1050
	0    -1   -1   0
$EndComp
Wire Wire Line
	1325  950  950  950
Wire Wire Line
	950  1150  950  1275
Wire Wire Line
	950  1275  1825  1275
Wire Wire Line
	1825  1275  1825  1150
Wire Wire Line
	1125  1150  1125  1700
$EndSCHEMATC

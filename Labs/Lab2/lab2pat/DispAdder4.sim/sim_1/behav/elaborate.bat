@echo off
set xv_path=C:\\Xilinx\\Vivado\\2016.4\\bin
call %xv_path%/xelab  -wto b4fd0cf92bb24a6d93bcead73425ef39 -m64 --debug typical --relax --mt 2 -L xil_defaultlib -L secureip --snapshot DispAdder4_tb_behav xil_defaultlib.DispAdder4_tb -log elaborate.log
if "%errorlevel%"=="0" goto SUCCESS
if "%errorlevel%"=="1" goto END
:END
exit 1
:SUCCESS
exit 0

----------------------------------------------------------------------------------
-- Description:   1-bit Adder (Test Bench)
-- Project:       Adder1 
-- Program-ID:    Adder1_tb.vhd
-- Author:        Kuo-pao Yang 
-- Package:       Xilinx Nexys4 DDR Board 
-- Device:        Artix-7 FPGA (XC7A100TCSG324-1) 
-- Software:      Vivado Design Suite
-- Notes:   1. ENTITY: No code (empty)
--          2. ARCHITECTURE: Put simulation code under PROCESS  
----------------------------------------------------------------------------------

LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;

ENTITY Adder1_tb IS
END Adder1_tb;

ARCHITECTURE simulate OF Adder1_tb IS
   COMPONENT Adder1
      PORT (
         a, b, cIn : IN std_logic;
	      cOut, sum : OUT std_logic);
   END COMPONENT;
   SIGNAL a, b, cIn: STD_LOGIC;
   SIGNAL cOut, sum: STD_LOGIC;
BEGIN
   uut: Adder1 PORT MAP (a, b, cIn, cOut, sum);
    
   stimulus: PROCESS
   BEGIN
         -- test bench stimulus code
         a     <= '0';     b     <= '0';     cIn   <= '0';
         WAIT FOR 100 ns;
         a     <= '0';     b     <= '0';     cIn   <= '1';
         WAIT FOR 100 ns;
         a     <= '0';     b     <= '1';     cIn   <= '0';
         WAIT FOR 100 ns;
         a     <= '0';     b     <= '1';     cIn   <= '1';
         WAIT FOR 100 ns;
         a     <= '1';     b     <= '0';     cIn   <= '0';
         WAIT FOR 100 ns;
         a     <= '1';     b     <= '0';     cIn   <= '1';
         WAIT FOR 100 ns;
         a     <= '1';     b     <= '1';     cIn   <= '0';
         WAIT FOR 100 ns;
         a     <= '1';     b     <= '1';     cIn   <= '1';
         WAIT FOR 100 ns;
         a     <= '0';     b     <= '0';     cIn   <= '0';
    
         WAIT;
   END PROCESS;
END simulate;

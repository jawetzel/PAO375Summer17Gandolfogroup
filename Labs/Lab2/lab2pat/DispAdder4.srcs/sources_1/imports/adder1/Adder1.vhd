----------------------------------------------------------------------------------
-- Description:   1-bit Adder
-- Project:       Adder1 
-- Program-ID:    Adder1.vhd
-- Authors:       Patrick Gandolfo,Ryan Craft,Joshua Wetzel,Joseph Schenck      -- Add your team¡¦s and members¡¦ names as Authors Here 
-- Package:       Xilinx Nexys4 DDR Board 
-- Device:        Artix-7 FPGA (XC7A100TCSG324-1) 
-- Software:      Vivado Design Suite
----------------------------------------------------------------------------------

LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;

ENTITY Adder1 IS
   PORT (
      a, b, cIn : IN std_logic;
      cOut, sum : OUT std_logic);
END Adder1;

ARCHITECTURE behavioral OF Adder1 IS
BEGIN
    sum <=  a XOR b XOR cIn;
    cOut <= (a AND b) OR ( a AND cIn) OR (b AND cIn);
      -- Insert two lines (one for cOut and the other for sum) of VHDL code Here

END behavioral;

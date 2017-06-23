library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity adder4 is
    generic(constant N: integer := 4);
    port(
        a, b: in std_logic_vector(n-1 downto 0);
        cOut: out std_logic;
        sum: out std_logic_vector(N-1 downto 0));
end adder4;

architecture Behaviorial of adder4 is
    signal out1, out2, out3 : std_logic;
    
    component adder1
        port(
            a, b, cIn: in std_logic;
            cOut, sum: out std_logic);
    end component;

signal carry_sig: std_logic_vector(N downto 0);

begin

end Behaviorial;
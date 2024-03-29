# 
# Synthesis run script generated by Vivado
# 

set_msg_config -id {Common 17-41} -limit 10000000
set_msg_config -id {HDL 9-1061} -limit 100000
set_msg_config -id {HDL 9-1654} -limit 100000
create_project -in_memory -part xc7a100tcsg324-1

set_param project.singleFileAddWarning.threshold 0
set_param project.compositeFile.enableAutoGeneration 0
set_param synth.vivado.isSynthRun true
set_property webtalk.parent_dir C:/Repos/School/PAO375Summer17Gandolfogroup/Labs/Lab3/alu4/alu4.cache/wt [current_project]
set_property parent.project_path C:/Repos/School/PAO375Summer17Gandolfogroup/Labs/Lab3/alu4/alu4.xpr [current_project]
set_property default_lib xil_defaultlib [current_project]
set_property target_language Verilog [current_project]
set_property ip_output_repo c:/Repos/School/PAO375Summer17Gandolfogroup/Labs/Lab3/alu4/alu4.cache/ip [current_project]
set_property ip_cache_permissions {read write} [current_project]
read_vhdl -library xil_defaultlib {
  C:/Repos/School/PAO375Summer17Gandolfogroup/Labs/Lab3/alu4/alu4.srcs/sources_1/new/adder1.vhd
  C:/Repos/School/PAO375Summer17Gandolfogroup/Labs/Lab3/alu4/alu4.srcs/sources_1/new/alu1.vhd
  C:/Repos/School/PAO375Summer17Gandolfogroup/Labs/Lab3/alu4/alu4.srcs/sources_1/new/bin2Hex.vhd
  C:/Repos/School/PAO375Summer17Gandolfogroup/Labs/Lab3/alu4/alu4.srcs/sources_1/new/alu4.vhd
  C:/Repos/School/PAO375Summer17Gandolfogroup/Labs/Lab3/alu4/alu4.srcs/sources_1/new/DispAlu4.vhd
}
foreach dcp [get_files -quiet -all *.dcp] {
  set_property used_in_implementation false $dcp
}
read_xdc C:/Repos/School/PAO375Summer17Gandolfogroup/Labs/Lab1/Lab1Josh/Lab1Josh.srcs/constrs_1/imports/CMPS375Lab1/Nexys4DDR_Master.xdc
set_property used_in_implementation false [get_files C:/Repos/School/PAO375Summer17Gandolfogroup/Labs/Lab1/Lab1Josh/Lab1Josh.srcs/constrs_1/imports/CMPS375Lab1/Nexys4DDR_Master.xdc]


synth_design -top DispAlu4 -part xc7a100tcsg324-1


write_checkpoint -force -noxdef DispAlu4.dcp

catch { report_utilization -file DispAlu4_utilization_synth.rpt -pb DispAlu4_utilization_synth.pb }

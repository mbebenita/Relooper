.PHONY: all

BUILD_DIR=../build

all: Relooper.cpp Relooper.h
	# Make sure emcc in your path.
	emcc -Oz Relooper.cpp -DNDEBUG -o $(BUILD_DIR)/relooper.raw.js --memory-init-file 0 -s TOTAL_STACK=16384 -s TOTAL_MEMORY=524288 -s NO_FILESYSTEM=1 -s NO_BROWSER=1 -O3 \
	-s 'EXPORTED_FUNCTIONS=["_rl_set_output_buffer","_rl_make_output_buffer","_rl_new_block","_rl_set_block_code","_rl_delete_block","_rl_block_add_branch_to","_rl_new_relooper","_rl_delete_relooper","_rl_relooper_add_block","_rl_relooper_calculate","_rl_relooper_render", "_rl_set_asm_js_mode"]' \
	-s 'DEFAULT_LIBRARY_FUNCS_TO_INCLUDE=["memcpy", "memset", "malloc", "free", "puts"]' --post-js glue.js
	echo "// Relooper, (C) 2012 Alon Zakai, MIT license, https://github.com/kripken/Relooper" > $(BUILD_DIR)/relooper.js
	echo "// See also https://github.com/mozilla/pluotsorbet/tree/master/jit/relooper" >> $(BUILD_DIR)/relooper.js
	cat umd-header.js >> $(BUILD_DIR)/relooper.js
	cat $(BUILD_DIR)/relooper.raw.js >> $(BUILD_DIR)/relooper.js
	echo "}));" >> $(BUILD_DIR)/relooper.js

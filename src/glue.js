
  var RBUFFER_SIZE = RELOOPER_BUFFER_SIZE;
  var rbuffer = _malloc(RBUFFER_SIZE);
  _rl_set_output_buffer(rbuffer, RBUFFER_SIZE);

  var TBUFFER_SIZE = RELOOPER_BUFFER_SIZE/2;
  var tbuffer = _malloc(TBUFFER_SIZE);

  var VBUFFER_SIZE = 256;
  var vbuffer = _malloc(VBUFFER_SIZE);

  var exports = Module;
  exports['init'] = function() {
    this.r = _rl_new_relooper();
  };
  exports['cleanup'] = function() {
    _rl_delete_relooper(this.r);
  };
  exports['addBlock'] = function(text, branchVar) {
    assert(this.r);
    if (text) {
      assert(text.length+1 < TBUFFER_SIZE, 'buffer too small, increase RELOOPER_BUFFER_SIZE');
      writeAsciiToMemory(text, tbuffer);
      if (branchVar) {
        assert(branchVar.length+1 < VBUFFER_SIZE, 'buffer too small, increase RELOOPER_BUFFER_SIZE');
        writeAsciiToMemory(branchVar, vbuffer);
      }
    }
    var b = _rl_new_block(text ? tbuffer : 0, branchVar ? vbuffer : 0);
    _rl_relooper_add_block(this.r, b);
    return b;
  };
  exports['setBlockCode'] = function(block, text) {
    assert(this.r);
    assert(text.length+1 < TBUFFER_SIZE, 'buffer too small, increase RELOOPER_BUFFER_SIZE');
    writeAsciiToMemory(text, tbuffer);
    _rl_set_block_code(block, tbuffer);
  };
  exports['addBranch'] = function(from, to, condition, code) {
    assert(this.r);
    if (condition) {
      assert(condition.length+1 < TBUFFER_SIZE/2, 'buffer too small, increase RELOOPER_BUFFER_SIZE');
      writeAsciiToMemory(condition, tbuffer);
      condition = tbuffer;
    } else {
      condition = 0; // allow undefined, null, etc. as inputs
    }
    if (code) {
      assert(code.length+1 < TBUFFER_SIZE/2, 'buffer too small, increase RELOOPER_BUFFER_SIZE');
      writeAsciiToMemory(code, tbuffer + TBUFFER_SIZE/2);
      code = tbuffer + TBUFFER_SIZE/2;
    } else {
      code = 0; // allow undefined, null, etc. as inputs
    }
    _rl_block_add_branch_to(from, to, condition, code);
  };
  exports['render'] = function(entry) {
    assert(this.r);
    assert(entry);
    _rl_relooper_calculate(this.r, entry);
    _rl_relooper_render(this.r);
    var ret = Pointer_stringify(rbuffer);
    _rl_delete_relooper(this.r);
    this.r = 0;
    return ret;
  };

export const empty = ( mixed_var ) => {
  //   example 1: empty(null);
  //   returns 1: true
  //   example 2: empty(undefined);
  //   returns 2: true
  //   example 3: empty([]);
  //   returns 3: true
  //   example 4: empty({});
  //   returns 4: true
  //   example 5: empty({'aFunc' : function () { alert('humpty'); } });
  //   returns 5: false

  let undef, key, i, len;
  let emptyValues = [undef, null, false, 0, '', '0', '0.0', '0.00', '0.000', '0.0000', '0.00000', '0.000000'];

  for (i = 0, len = emptyValues.length; i < len; i++)
  {
    if (mixed_var === emptyValues[i])
	{
      return true;
    }
  }

  if (typeof mixed_var === 'object')
  {
    for (key in mixed_var)
    {
      // TODO: should we check for own properties only?
      //if (mixed_var.hasOwnProperty(key)) {
      return false;
      //}
    }

    return true;
  }

  return false;
}

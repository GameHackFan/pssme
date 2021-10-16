class ObjectUtil
{
	deepCopy = (obj) =>
	{
		if(!obj || typeof obj !== "object")
			return obj;

		var retObj = {};

		for(var attr in obj)
		{
			var type = obj[attr];

			switch(true)
			{
				case(type instanceof Date):
					var _d = new Date();
					_d.setDate(type.getDate())
					retObj[attr]= _d;
					break;

				case(type instanceof Function):
					retObj[attr]= obj[attr];
					break;

				case(type instanceof Array):
					var _a =[];
					for (var e of type)
					{
						//_a.push(e);
						_a.push(this.deepCopy(e));
					}
					retObj[attr]= _a;
					break;

				case (type instanceof Object):
					var _o ={};
					for (var e in type)
					{
						//_o[e] = type[e];
						_o[e] = this.deepCopy(type[e]);
					}
					retObj[attr]= _o;
					break;

				default:
					retObj[attr]= obj[attr];
			}
		}

		return retObj;
	}

	removeAllProperties = (obj) =>
	{
		Object.keys(obj).forEach((property) =>
		{
			delete obj[property];
		});
	}
}


const objectUtil = new ObjectUtil();
export default objectUtil;
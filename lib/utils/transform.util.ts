import * as _ from 'lodash';

export const objectToMap = (object) => {
  const result = {};
  parseObjectToMap(result, object);

  return result;
};

export const mapToObject = (map) => {
  const result = {};
  for (const key in map) {
    if (!map.hasOwnProperty(key)) {
      continue;
    }

    _.set(result, key, map[key]);
  }

  return result;
};

export const stringToKeyValue = (
  values: string[],
  char = '=',
): Map<string, string> => {
  const map = new Map<string, string>();
  values.forEach((value) => {
    value = value.trim();
    const chunks = value.split(char);
    map.set(chunks[0], chunks[1]);
  });
  return map;
};

function parseObjectToMap(mapper, object, path?) {
  if (!mapper) {
    mapper = {};
  }

  for (const key in object) {
    if (!object.hasOwnProperty(key)) {
      continue;
    }
    let newPath;
    if (!path) {
      newPath = key;
    } else {
      newPath = path + '.' + key;
    }

    if (!object.hasOwnProperty(key)) {
      continue;
    }

    if (_.isArray(object[key])) {
      mapper[newPath] = object[key];
      parseArray(mapper, object[key], newPath);
    } else if (_.isObject(object[key])) {
      mapper[newPath] = object[key];
      parseObjectToMap(mapper, object[key], newPath);
    } else {
      mapper[newPath] = object[key];
    }
  }
}

function parseArray(mapper, array, path) {
  array.forEach((item, index) => {
    const newPath = path + '[' + index + ']';
    if (_.isObject(item)) {
      parseObjectToMap(mapper, item, newPath);
    } else if (_.isArray(item)) {
      parseArray(mapper, item, newPath);
    } else {
      mapper[newPath] = item;
    }
  });
}

export function toObject<T>(jsonStr: string) {
  let result;
  try {
    result = JSON.parse(jsonStr) as T;
  } catch (e) {
    result = {};
  }
  return result;
}

export function toJSON(jsonStr: string) {
  let result;
  try {
    result = JSON.stringify(jsonStr);
  } catch (e) {
    result = '';
  }
  return result;
}

export const byteHelper = function (value) {
  if (value === 0) {
    return '0 b';
  }
  const units = ['b', 'kB', 'MB', 'GB', 'TB'];
  const number = Math.floor(Math.log(value) / Math.log(1024));
  return (
    (value / Math.pow(1024, Math.floor(number))).toFixed(1) +
    ' ' +
    units[number]
  );
};

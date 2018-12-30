/*
validator's isValidXML function receives a string, checks if a string is a valid xml, and returns a boolean.

<a /> => true
<a></a> => true
<a>test</a> => true
<a><b></b></a> => true
<a></a><b></b> => true

<a> => false
<<a></a> => false
<a><b></a></b> => false

IMPORTANT: Please note that we have our own internal rules about validity.
1. A node cannot contain a node with the same tag. ex) <a><a></a></a> => false
2. A node cannot be followed by a node with the same tag. ex) <a></a><a></a> => false
3. An xml cannot be more than 2 levels deep. ex) <a><b><c><d></d></c></b></a> => false

IMPORTANT: Feel free to use any open source libraries you find necessary. You can use xml parsing libraries as well.
IMPORTANT: Don't worry about XML declaration, node attributes, or unicode characters.

For further examples, please check basic_spec.js file.

DO NOT MODIFY
*/

/*
@param xmlString: a string, possibly a valid xml string
@return boolean;
*/
exports.isValidXML = xmlString => {
  if (xmlString.length > 0 && !xmlString.match('>>') && !xmlString.match('<<') && !xmlString.match('//')) {

      const getInnerDepth = (xmlString) => {
          const xmlArray = getSplitedXml(xmlString);
              if (Array.isArray(xmlArray)) {
                  const slicedMFirstTag = xmlArray[2].slice(0, 1)
                  if (slicedMFirstTag === '<') {
                      return getSplitedXml(`${xmlArray[2]}`)
                  } else {
                      return true
                  }
              } else {
                  return xmlArray;
              }
      }

      const getSplitedXml = (xmlStr) => {
            if (xmlStr.length !== 0) {
                  const firstTag = xmlStr.slice(0, xmlStr.match('>').index + 1)
                  const getReverseStr = (str) => [...str].reverse().join('')
                  const lastTag = getReverseStr(getReverseStr(xmlStr).slice(0, getReverseStr(xmlStr).match('<').index + 1))
                  const slicedStr = xmlStr.slice(firstTag.length)
                  const medium = slicedStr.slice(0, slicedStr.length - lastTag.length)
                  const splitedXml = [firstTag, lastTag, medium]
                  if (lastTag === firstTag && [...firstTag][firstTag.length - 2] === '/') {
                        return true
                  } else {
                    if (lastTag[1] !== '/') return false
                    if (!checkTagContentSame(firstTag, lastTag)) {
                          return false
                    } else {
                          if (splitedXml[2].length === 0) {
                              return true
                          } else {
                              return splitedXml
                          }
                    }
                  }
            } else {
              return false;
            }
      }

      const checkTagContentSame = (first, last) => {
            const firstContent = (tag) => tag.replace('<', '').replace('>', '')
            const lastContent = (tag) => tag.replace('<', '').replace('>', '').replace('/', '')
            return firstContent(first) === lastContent(last) ? true : false
      }

      return getInnerDepth(xmlString)
  }
  return false;
};

export default (acceptedTags, tag) => {
  tag = tag.toLowerCase();
  acceptedTags.forEach((validTag) => {
    if (tag === validTag) return true
  });
  return false;
};
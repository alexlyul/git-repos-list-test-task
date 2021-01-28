let globalId = 0;

export default function getId(prefix = '') {
  globalId += 1;
  return String(prefix) + globalId;
}

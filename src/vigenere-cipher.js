const { NotImplementedError } = require('../lib');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    return this._process(message, key, true);
  }

  decrypt(encryptedMessage, key) {
    return this._process(encryptedMessage, key, false);
  }

  _process(message, key, isEncrypting) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    const upperMsg = message.toUpperCase();
    const upperKey = key.toUpperCase();
    let keyIndex = 0;
    let result = '';

    for (let i = 0; i < upperMsg.length; i++) {
      const code = upperMsg.charCodeAt(i);

      if (code >= 65 && code <= 90) {
        const shift = upperKey.charCodeAt(keyIndex % upperKey.length) - 65;
        keyIndex++;

        let newCode;
        if (isEncrypting) {
          newCode = ((code - 65 + shift) % 26) + 65;
        } else {
          newCode = ((code - 65 - shift + 26) % 26) + 65;
        }

        result += String.fromCharCode(newCode);
      } else {
        result += upperMsg[i];
      }
    }

    return this.isDirect ? result : result.split('').reverse().join('');
  }
}

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};

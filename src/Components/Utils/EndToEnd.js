import crypto from 'crypto';
import db from './User.model';
import Slug from './Slug.model';

class EndToEnd {
  constructor() {
    this.peer = crypto.createECDH('secp256k1');
    this.SharedSecret = '';
    this.secrets = new Map();
  }

  // Generate Keys
  generateKeys() {
    this.peer.generateKeys();
    const Publickey = this.peer.getPublicKey().toString('base64');
    const PrivateKey = this.peer.getPrivateKey().toString('base64');
    return { Publickey, PrivateKey };
  }

  generateSharedSecret(publickey) {
    this.generateKeys();
    const SharedSecret = this.peer.computeSecret(publickey, 'base64', 'hex');
    this.SharedSecret = SharedSecret;
    return this.peer.getPublicKey().toString('base64');
  }

  produceSharedSecret(publickey) {
    const SharedSecret = this.peer.computeSecret(publickey, 'base64', 'hex');
    this.SharedSecret = SharedSecret;
    return this.peer.getPublicKey().toString('base64');
  }

  setChannel(channelId, deletes, slug) {
    db.channel
      .add({ SharedSecret: this.SharedSecret, id: channelId })
      .then(async () => {
        console.log('Success in insertation', this.SharedSecret, channelId);
        if (deletes) {
          const deleteCount = await Slug.slug
            .where('id')
            .equalsIgnoreCase(slug)
            .delete();
          console.log(`Deleted ${deleteCount} objects`);
        }
      })
      .catch((err) => console.log(err));
  }

  setPrivateKey(slug, channelId, bobPublicKey) {
    return new Promise((res, rej) => {
      try {
        Slug.slug
          .where('id')
          .equalsIgnoreCase(slug)
          .toArray()
          .then((collection) => {
            const { PrivateKey } = collection[0];
            if (PrivateKey) {
              this.peer.setPrivateKey(PrivateKey, 'base64');
              const SharedSecret = this.peer.computeSecret(
                bobPublicKey,
                'base64',
                'hex',
              );
              this.SharedSecret = SharedSecret;
              this.setChannel(channelId, true, slug);
              res('Success');
            }
          });
      } catch (err) {
        console.log(err);
        rej(err);
      }
    });
  }

  getSharedSecret(channelId) {
    return new Promise((res, rej) => {
      try {
        db.channel
          .where('id')
          .equalsIgnoreCase(channelId)
          .toArray()
          .then((key) => {
            const { SharedSecret } = key[0];
            this.secrets.set(channelId, SharedSecret);
            res(SharedSecret);
          });
      } catch (err) {
        rej(err);
      }
    });
  }

  async encrypt(channelId, message) {
    let SharedSecret;
    if (this.secrets.has(channelId)) {
      SharedSecret = this.secrets.get(channelId);
    } else {
      SharedSecret = await this.getSharedSecret(channelId);
    }
    const IV = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      'aes-256-gcm',
      Buffer.from(SharedSecret, 'hex'),
      IV,
    );

    let encrypted = cipher.update(JSON.stringify(message), 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    const payload = Buffer.from(
      IV.toString('hex') + encrypted + authTag,
      'hex',
    ).toString('base64');
    return payload;
  }

  async decrypt(channelId, encryptedMessage) {
    let SharedSecret;
    if (this.secrets.has(channelId)) {
      SharedSecret = this.secrets.get(channelId);
    } else {
      SharedSecret = await this.getSharedSecret(channelId);
    }

    const bobPayload = Buffer.from(encryptedMessage, 'base64').toString('hex');

    const bobIv = bobPayload.substr(0, 32);
    const bobEncrypted = bobPayload.substr(32, bobPayload.length - 32 - 32);
    const bobAuthtag = bobPayload.substr(bobPayload.length - 32, 32);

    const Decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      Buffer.from(SharedSecret, 'hex'),
      Buffer.from(bobIv, 'hex'),
    );

    Decipher.setAuthTag(Buffer.from(bobAuthtag, 'hex'));

    let decrypt = Decipher.update(bobEncrypted, 'hex', 'utf8');
    decrypt += Decipher.final('utf8');

    return decrypt;
  }
}

export default EndToEnd;

import crypto from 'crypto';
import db from './User.model';

class EndToEnd {
    constructor(user, object) {
        this.peer = crypto.createECDH('secp256k1');
        this.user = user;
        this.object = object;
    }

    // Generate Keys
    generateKeys() {
        this.peer.generateKeys();
        const Publickey = this.peer.getPublicKey().toString('base64');
        const obj = {
            displayName: this.user.displayName || this.object.displayName,
            photoURL: this.user.photoURL || this.object.photoURL,
            id: this.user.uid,
            isAnonymous: this.user.isAnonymous,
            Publickey,
        };

        console.log(obj);

        // Insert into the db
        db.user.add(obj)
            .then(() => console.log('Succes in inserting '))
            .catch((err) => console.log(err));
    }

    generateSharedSecret(publickey) {
        this.peer.generateKeys();
        const SharedSecret = this.peer.computeSecret(publickey, 'base64', 'hex');
        console.log(SharedSecret);
    }
}

export default EndToEnd;

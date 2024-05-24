Mongoose:

Schema: mongoose.Schema(schemaDefinition) (defines doc structure)

Example: You likely have a complex schemaDefinition object imported from ./schemas that defines properties for moderators (including nested objects for children in parents).
Save: .save() (saves new doc to database)

Example: const mod = new this.modModel({ ... }); await mod.save() (creates a new mod instance and saves it with properties from modObj).
Find One: Model.findOne(query, projection) (finds single doc by criteria)

Example: const mod = await this.modModel.findOne({ busNo: modNo }) (finds a moderator document by their bus number).
Update One: Model.findOneAndUpdate(query, update) (updates single doc by criteria)

Complex Example: await this.modModel.findOneAndUpdate({ busNo: modNo }, { $push: { "parents": newParent } }) (adds a new parent object (newParent) to the parents array of a moderator identified by their bus number).


Schemas:
const childrenSchema = {
    childName: {
        type: String
    },
    childImage: {
        type: String
    }
};

const parentsSchema = {
    phone: {
        type: String,
        unique: true
    },
    altPhone: {
        type: String
    },
    children: {
        type: [childrenSchema]
    },
};


const USERSCHEMA = {
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    email: {
        type: String
    },
    children: {
        type: [childrenSchema],
        required: true
    },
    pw: {
        type: String
    },
    salt: {
        type: String
    },
    // Number verification here is for sms 2-step auth
    verificationCode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    altPhone: {
        type: String
    }
};

const MODSCHEMA = {
    name: {
        type: String,
        required: true
    },
    pw: {
        type: String,
    },
    salt: {
        type: String,
    },
    verificationCode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    schoolName: {
        type: String,
        required: true
    },
    busNo: {
        type: Number,
        required: true,
        unique: true
    },
    parents: {
        type: [parentsSchema]
    }
};

const ModInSchool = {
    moderatorName: {
        type: String,
        required: true
    },
    moderatorNumber: {
        type: String,
        unique: true
    },
    isVerifiedModerator: {
        type: Boolean
    },
    busNo: {
        type: Number,
        required: true
    },
};

const SCHOOLSCHEMA = {
    name: {
        type: String,
    },
    schoolName: {
        type: String,
    },
    pw: {
        type: String,
    },
    salt: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        validate: value => validator.isEmail(value)
    },
    emailVerification: {
        type: String,
        required: true
    },
    isSchool: {
        type: Boolean
    },
    mods: {
        type: [ModInSchool]
    }
};
class UploadDocument {
    constructor(id_verify_data, path, created_at, updated_at, id_user) {
        this.id_verify_data = id_verify_data;
        this.path = path; 
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.id_user = id_user;
    }
}

module.exports = UploadDocument;
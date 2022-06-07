class ApiFeature {
    constructor (query, queryParams) {
        this.query = query;
        this.queryParams = queryParams;
    }

    filter() {
        const queryParamsObj = {...this.queryParams};
        const excludingParams = ['sort', 'page', 'limit', 'fields'];
        excludingParams.forEach(el => delete queryParamsObj[el]);

        //advance filtering removing greaterThan, greaterThanOrEqualsTo, lessThan, lessThanOrEqualsTo
        let queryToString = JSON.stringify(queryParamsObj);
        queryToString = queryToString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        const findObj = JSON.parse(queryToString);

        this.query = this.query.find(findObj);
        return this;
    }

    sort() {
       if(this.queryParams.sort){
           const sortBy = this.queryParams.sort.split(',').join(" ");
           this.query.sort(sortBy);
       }else{
           this.query.sort('-ceatedAt');
       }
       return this;
    }

    paginate() {
        if(this.queryParams.page){
            const page = this.queryParams.page * 1 || 1;
            const limit = this.queryParams.limit * 1 || 10;
            const skip = (page -1) * limit;

            this.query.skip(skip).limit(5);
        }
        return this;
    }

    limitFields() {
        if(this.queryParams.fields){
            const fields = this.queryParams.fields.split(',').join(" ");
            this.query.select(fields);
        }else {
            this.query.select("-__v");
        }
        return this;
    }
}

module.exports = ApiFeature;
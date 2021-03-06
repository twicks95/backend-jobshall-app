const helper = require('../../helpers/wrapper')
const experienceModel = require('./experience_model')

module.exports = {
  getExperienceById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await experienceModel.getDataById(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data By Id', result)
      } else {
        return helper.response(res, 404, 'Data By id .... Not Found !', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postExperience: async (req, res) => {
    try {
      const {
        workerId,
        experienceCompany,
        experiencePosition,
        experienceDateStart,
        experienceDateEnd,
        experienceDesc
      } = req.body
      const setData = {
        worker_id: workerId,
        experience_company: experienceCompany,
        experience_position: experiencePosition,
        experience_date_start: experienceDateStart,
        experience_date_end: experienceDateEnd,
        experience_desc: experienceDesc
      }
      const result = await experienceModel.createData(setData)
      return helper.response(res, 200, 'Success Create Skill', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateExperience: async (req, res) => {
    try {
      const { id } = req.params
      const {
        workerId,
        experienceCompany,
        experiencePosition,
        experienceDateStart,
        experienceDateEnd,
        experienceDesc
      } = req.body
      const setData = {
        worker_id: workerId,
        experience_company: experienceCompany,
        experience_position: experiencePosition,
        experience_date_start: experienceDateStart,
        experience_date_end: experienceDateEnd,
        experience_desc: experienceDesc,
        experience_updated_at: new Date(Date.now())
      }
      const result = await experienceModel.updateData(setData, id)
      return helper.response(res, 200, 'Success Update Experience', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteExperience: async (req, res) => {
    try {
      const { id } = req.params
      const initialResult = await experienceModel.getDataByIdDelete(id)
      if (initialResult.length > 0) {
        const result = await experienceModel.deleteData(id)
        // kondisi pengecekan dalam id
        // console.log(result)
        if (result) {
          return helper.response(
            res,
            200,
            'Success Delete By Id',
            initialResult[0]
          )
        } else {
          return helper.response(res, 404, 'Data By id .... Not Found !', null)
        }
      } else {
        // return helper.response(res, 404, 'Data By id .... Not Found !', null)
        console.log(null)
      }
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  }
}

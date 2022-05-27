import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('Category', CategorySchema);

export class CategoryModel {
  // 1. 카테고리 생성
  async create(categoryInfo) {
    const createdNewCategory = await Category.create(categoryInfo);
    return createdNewCategory;
  }
  

  // 2. 카테고리 목록 조회
  async findAll() {
    const categories = await Category.find({});
    return categories;
  }


  // 3. 카테고리 아이디를 이용한 조회
  async findById(categoryId) {
    const category = await Category.findOne({ _id: categoryId });
    return category;
  }


  // 4. 카테고리 수정
  async update(categoryId, update) {
    const filter = { _id: categoryId };
    const option = { returnOriginal: false };
    const updatedCategory = await Category.findOneAndUpdate( filter, update, option );
    return updatedCategory;
  }


  // 5. 카테고리 삭제
  async del(categoryId) {
    const result = await Category.findByIdAndRemove({ _id: categoryId });
    if (result) {
      return 'Successfully deleted';
    }
    return result;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };

import * as Api from '/api.js';
import { validateProduct } from './../utils/validateForm.js';
import alertModal from '/components/alertModal.js';
import successModal from '/components/successModal.js';

const ProductEdit = {
  componentDidMount: async (_id, productCat) => {
    let formData;
    const setFormData = (formData1) => {
      formData = formData1;
    };
    const submitButton = document.querySelector('#submitButton');
    if (productCat) {
      document.getElementById(`${productCat._id}`).selected = true;
    }

    submitButton.addEventListener('click', async (e) => {
      e.preventDefault();
      let image = document.getElementById('imageInput').value;
      if (formData) {
        const data = await Api.postImage('/api/product/image', formData);
        if (data.error) {
          alertModal.handleError(`${data.error}`);
        } else {
          image = data.image;
        }
      }

      const name = document.getElementById('nameInput').value;
      const price = document.getElementById('priceInput').value;
      const category = document.getElementById('categoriesSelect').value;
      const stock = document.getElementById('stockInput').value;

      const description = document.getElementById('descriptionInput').value;
      try {
        validateProduct(name, price, description, stock);
      } catch (err) {
        return alertModal.handleError(err);
      }
      try {
        const data = {
          name,
          price,
          category,
          image,
          description,
          stock,
        };
        await Api.patch('/api/product', `${_id}`, data);
        successModal.activate(`정상적으로 수정되었습니다.`, function () {
          window.location.href = '/adminProducts/';
        });

        // 홈 페이지 이동
      } catch (err) {
        console.error(err.stack);
        alertModal.handleError(`${err.message}`);
      }
    });

    document
      .getElementById('image-file')
      .addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setFormData(formData);
        document.getElementById('imageInput').value =
          '/images/' + e.target.files[0].name;
        document.getElementById('product-image-file').src = URL.createObjectURL(
          e.target.files[0]
        );
      });
  },
  render: (product, categories) => {
    return `
    <div class="register-user-form-container">
    <form class="box register-user-form-box" id="registerUserForm">
      <p class="title is-5 has-text-primary">수정하세요!</p>
        <div id="form-container">
  
            <div class="field">
            <label class="label" for="nameInput">제품 이름</label>
            <div class="control">
                <input
                class="input"
                id="nameInput"
                type="text"
                placeholder="제품 이름"
                autocomplete="on"
                value="${product.name}"
                />
            </div>
            </div>
            
            <div class="field mb-2">
            <label class="label" for="priceInput">가격</label>
            <div class="control">
                <input
                class="input"
                id="priceInput"
                type="text"
                placeholder="가격"
                autocomplete="on"
                value="${product.price}"
                />
            </div>
            </div>

            <div class="field mb-2">
            <label class="label" for="categoryInput">카테고리</label>
            <select name="categoriesSelect" class="select input" id ="categoriesSelect">
              ${categories
                .map(
                  (category) => `
                        <option id="${category?._id}">${category?.name}</option>
                  }
                    `
                )
                .join('\n')}
            </select>
            </div>

            <div class="field mb-2">
              <label class="label" for="stockInput">재고</label>
              <div class="control">
                  <input
                  class="input"
                  id="stockInput"
                  type="text"
                  placeholder="가격"
                  autocomplete="on"
                  value="${product.stock}"
                  />
              </div>
            </div>

            <div class="field mb-2">
            <label class="label" for="imageInput">이미지</label>
            <div class="control">
                <input
                readOnly
                class="input"
                id="imageInput"
                name="image"
                type="text"
                placeholder="이미지"
                autocomplete="on"
                value="${product.image ? product.image : ''}"
                />
                <div id = "image-control"> 
                <img src = "${
                  product.image ? product.image : ''
                }"  width="30" height="30" id="product-image-file" />
                <input type="file" name="image-file" id="image-file"/>
                
                </div>
            </div>
            </div>

            <div class="field mb-2">
            <label class="label" for="descriptionInput">제품 설명</label>
            <div class="control">
                <textarea
                class="input"
                name ="textarea"
                id="descriptionInput"
                type="text"
                rows="10"
                maxlength="300"
                placeholder="제품 설명"
                autocomplete="on"
                style="min-height: 7rem"
                >${product.description}</textarea>
            </div>
            </div>

        </div>
        <button class="button is-primary mt-5 is-fullwidth" id="submitButton">
          제품 정보 수정하기
        </button>
        <button class="cancleButton button is-danger is-fullwidth" id="cancleButton">
          취소하기
        </button>
      
      </form>
      
    </div>
    `;
  },
};
export default ProductEdit;

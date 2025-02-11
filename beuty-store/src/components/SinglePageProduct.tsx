function SinglePageProduct() {
    return (
      <section className="singlePageProduct">
        <div className="container">
          <div className="singlePageProducts__items">
            <div className="top">
              <div className="top-title flex items-center">
              </div>
  
              <div className="left__right-SinglePageProduct flex items-start justify-between mt-12">
                <div className="left">
                  <img className="max-w-96 w-full" src="/img/card1.jpg" alt="" />
                </div>
  
                <div className="right">
                  <div className="productName__countPrice">
                    <h2 className="text-3xl text-black font-medium">SOMANG COSMETICS</h2>
                    <h2 className="text-maBlue font-bold text-3xl mt-4">4 200тг</h2>
  
                    <div className="mt-3 countCart flex items-center justify-between max-w-44 border rounded-xl px-4 py-2 border-gray-400">
                      <div className="count flex items-center gap-2">
                        <p>-</p>
                        <b>1</b>
                        <p>+</p>
                      </div>
                      <div className="cart">
                        <p className="text-maBlue">В КОРЗИНУ</p>
                      </div>
                    </div>
                  </div>
                  <nav className="mt-8">
                    <ul className="flex items-center gap-8">
                      <li>Описание</li>
                      <li>Характеристики</li>
                      <li>Отзывы</li>
                    </ul>
                  </nav>
                  <div className="info__size mt-8">
                    <p className="max-w-2xl">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Eaque, quam. Vitae dolorem libero facilis fuga mollitia,
                      cupiditate corrupti earum eligendi possimus neque dicta
                      accusantium doloribus perferendis tempore ipsum recusandae
                      nobis reiciendis! Cum aliquam unde hic fugit sint ut
                      officiis aperiam, ipsam excepturi illum non cumque ipsa fuga
                      voluptatibus totam, neque impedit nulla consequuntur dolorum
                      explicabo voluptatum porro inventore at. Ipsum voluptates
                      nostrum doloremque quas dicta excepturi est cumque non
                      sequi.
                    </p>
  
                    <div className="size mt-12">
                      <p>
                        Объем: <span>150 мл</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="bottom mt-20">
              <h1 className="font-medium text-center text-3xl">
                ВАМ ТАКЖЕ МОЖЕТ ПОНРАВИТЬСЯ
              </h1>
  
              <div className="flex items-center justify-between gap-5 mt-12">
                <div className="cards flex items-center justify-center gap-12 overflow-scroll w-full">
                  <div className="cardWords flex-none w-1/4">
                    <Card
                      imgSrc="/img/card1.jpg"
                      title="SOMANG COSMETICS"
                      subtitle="Кондиционер"
                      description="SOMANG COSMETICS ECO ALOE HAIR CONDITIONER"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
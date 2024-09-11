export function getPlaces(places: Array<object>) {
    let arr = [];

    for (let i = 0; i < places.length; i++) {
        const element = places[i];
        arr.push(
            <div className="p-4 w-full">
            <div className="h-full border-2 border-[#00bcae] bg-[#005d5b] rounded-lg overflow-hidden">
                <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={element.image} alt="blog"/>
                <div className="p-6">
                    <h1 className="title-font text-lg font-medium font-semibold text-[#00bcae] mb-3">{element.name}</h1>
                    <p className="leading-relaxed text-gray-400 mb-3">{element.location}</p>
                    <div className="flex gap-2 items-center flex-wrap">
                        <a href={`/places/${element.id}`} className=' flex-1 flex-shrink-0 btn border-0 rounded-full bg-[#00bcae] text-white hover:bg-[#00bcafc9]'>View More</a>
                        <button className="btn btn-circle bg-[#00bcae] text-white hover:bg-[#00bcafc9] border-0">
                            <i className=" uis uis-bookmark text-2xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
    return arr;
}
const findMatch = async (clientLanguages, availability) => {
    const availableTranslators = await User.find({
        role: 'translator',
        availability: true,
        languagePairs: { $in: clientLanguages }
    }).sort({ rating: -1 });
    
    return availableTranslators;
}; 